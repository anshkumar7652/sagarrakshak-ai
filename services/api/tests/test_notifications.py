import pytest
from unittest.mock import patch, MagicMock
from app.services.notifications.dispatcher import EmailNotificationDispatcher
import time

def test_dispatcher_no_credentials():
    dispatcher = EmailNotificationDispatcher()
    dispatcher.password = None
    dispatcher.username = None
    
    # Should fallback to console logging
    with patch('app.services.notifications.dispatcher.logger.warning') as mock_log:
        result = dispatcher.send_email("test@example.com", "Test", "Body")
        assert result is True
        assert mock_log.called
        
        # Verify rate limiting applied
        assert "test@example.com" in dispatcher._last_alert_time

def test_dispatcher_rate_limiting():
    dispatcher = EmailNotificationDispatcher()
    dispatcher.password = None # use mock mode
    
    # Initial send
    res1 = dispatcher.send_email("rate@example.com", "Subj", "Body")
    assert res1 is True
    
    # Second send immediately should be rate limited
    with patch('app.services.notifications.dispatcher.logger.info') as mock_info:
        res2 = dispatcher.send_email("rate@example.com", "Subj 2", "Body 2")
        assert res2 is False
        mock_info.assert_called_with("Alert to rate@example.com skipped due to rate limiting (1 hr cooldown).")

@patch('app.services.notifications.dispatcher.smtplib.SMTP')
def test_dispatcher_with_credentials(mock_smtp):
    dispatcher = EmailNotificationDispatcher()
    dispatcher.username = "bot@example.com"
    dispatcher.password = "secret"
    
    mock_server = MagicMock()
    mock_smtp.return_value.__enter__.return_value = mock_server
    
    result = dispatcher.send_email("deoc@example.com", "Alert", "Critical Body")
    
    assert result is True
    mock_server.starttls.assert_called_once()
    mock_server.login.assert_called_with("bot@example.com", "secret")
    mock_server.send_message.assert_called_once()
    assert "deoc@example.com" in dispatcher._last_alert_time
