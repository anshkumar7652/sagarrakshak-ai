import os
import smtplib
import logging
from email.message import EmailMessage
from typing import List, Dict, Any
import time

logger = logging.getLogger(__name__)

class EmailNotificationDispatcher:
    def __init__(self):
        self.server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.port = int(os.getenv("SMTP_PORT", 587))
        self.username = os.getenv("SMTP_USERNAME")
        self.password = os.getenv("SMTP_PASSWORD")
        self.target_email = os.getenv("DEOC_ALERT_EMAIL", "deoc@odisha.gov.in")
        
        # Rate limiting: target_email -> last_sent_timestamp
        self._last_alert_time: Dict[str, float] = {}
        self.cooldown_seconds = 3600  # 1 hour cooldown per recipient

    def _is_rate_limited(self, email: str) -> bool:
        last_sent = self._last_alert_time.get(email, 0)
        return (time.time() - last_sent) < self.cooldown_seconds

    def send_email(self, to_email: str, subject: str, body: str) -> bool:
        """Sends an email via SMTP or logs to console if credentials are missing."""
        if self._is_rate_limited(to_email):
            logger.info(f"Alert to {to_email} skipped due to rate limiting (1 hr cooldown).")
            return False

        if not self.password or not self.username:
            logger.warning("\n" + "="*50)
            logger.warning("MOCK EMAIL DISPATCH (No SMTP Credentials)")
            logger.warning(f"TO: {to_email}")
            logger.warning(f"SUBJECT: {subject}")
            logger.warning(f"BODY:\n{body}")
            logger.warning("="*50 + "\n")
            self._last_alert_time[to_email] = time.time()
            return True

        try:
            msg = EmailMessage()
            msg.set_content(body)
            msg["Subject"] = subject
            msg["From"] = self.username
            msg["To"] = to_email

            with smtplib.SMTP(self.server, self.port) as server:
                server.starttls()
                server.login(self.username, self.password)
                server.send_message(msg)
                
            logger.info(f"Successfully dispatched high-risk alert email to {to_email}")
            self._last_alert_time[to_email] = time.time()
            return True
        except Exception as e:
            logger.error(f"Failed to send SMTP email: {e}")
            return False

    def dispatch_high_risk_alerts(self, cyclone_name: str, districts: List[Any], assets: List[Any]) -> None:
        """Formats and sends an alert for critical districts and assets."""
        if not districts and not assets:
            return

        subject = f"[URGENT] SagarRakshak AI Alert: {cyclone_name} High Risk Detected"
        
        body_lines = [
            f"DEOC ALERT - CRITICAL THREAT WARNING FOR CYCLONE {cyclone_name.upper()}",
            "----------------------------------------------------------"
        ]

        if districts:
            body_lines.append("\nCRITICAL DISTRICTS AT RISK:")
            for d in districts:
                body_lines.append(f"- {d.district_name}: {d.primary_threat}")
                body_lines.append(f"  Action: {d.recommended_district_action}")
        
        if assets:
            body_lines.append("\nCRITICAL INFRASTRUCTURE AT RISK:")
            for a in assets:
                body_lines.append(f"- {a.name} ({a.type}, {a.district})")
                body_lines.append(f"  Risk Score: {a.composite_risk_score}")
                body_lines.append(f"  Action: {a.recommended_action}")

        body_lines.append("\n----------------------------------------------------------")
        body_lines.append("Please log in to the SagarRakshak AI dashboard to view real-time mapping and initiate standard operating procedures.")
        
        body = "\n".join(body_lines)
        
        # Send to configured DEOC email
        self.send_email(self.target_email, subject, body)

# Singleton instance
email_dispatcher = EmailNotificationDispatcher()
