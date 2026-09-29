import pytest
from unittest.mock import patch, MagicMock
from app.services.gee.engine import GEEEngine

def test_gee_engine_fallback_initialization():
    # Test when no credentials exist
    with patch('app.services.gee.engine.GEEEngine._has_valid_credentials', return_value=False):
        engine = GEEEngine()
        assert not engine.is_initialized

def test_get_rainfall_summary_fallback():
    engine = GEEEngine()
    engine.is_initialized = False # Force fallback
    
    result = engine.get_rainfall_summary()
    assert "source" in result
    assert "NASA GPM_L3/IMERG_V07" in result["source"]
    assert "Puri" in result["district_accumulations_mm"]

def test_get_population_exposure_fallback():
    engine = GEEEngine()
    engine.is_initialized = False
    
    pop = engine.get_population_exposure("Puri")
    assert pop == 1698733

@patch('app.services.gee.engine.ee')
def test_gee_engine_live_rainfall(mock_ee):
    # Mock Earth Engine setup
    mock_dataset = MagicMock()
    mock_ee.ImageCollection.return_value.filterDate.return_value.select.return_value = mock_dataset
    
    mock_districts = MagicMock()
    mock_ee.FeatureCollection.return_value.filter.return_value = mock_districts
    
    # Mock getInfo to return fake stats
    mock_districts.map.return_value.getInfo.return_value = {
        'features': [
            {
                'properties': {
                    'ADM2_NAME': 'Puri',
                    'accum_24h_mm': 150.5
                }
            }
        ]
    }
    
    engine = GEEEngine()
    engine.is_initialized = True
    
    result = engine.get_rainfall_summary()
    assert result['source'] == "NASA GPM_L3/IMERG_V06 (Live GEE)"
    assert "Puri" in result['district_accumulations_mm']
    assert result['district_accumulations_mm']["Puri"]["hazard_rating"] == "VERY_HIGH"
