import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import json

# Simulate ML model for waste prediction
class WastePredictionModel:
    def __init__(self):
        self.model_accuracy = 0.87
        self.features = [
            'weather_temp', 'wind_speed', 'tide_level', 
            'tourist_activity', 'day_of_week', 'season'
        ]
    
    def predict_waste_collection(self, location, date, weather_data):
        """
        Predict waste collection amount for a given location and date
        """
        # Simulate feature extraction
        features = self._extract_features(location, date, weather_data)
        
        # Base prediction based on location
        base_amounts = {
            'Versova Beach': 380,
            'Juhu Beach': 290,
            'Marine Drive': 150,
            'Chowpatty': 200,
            'Bandra Bandstand': 180
        }
        
        base_amount = base_amounts.get(location, 200)
        
        # Apply weather and seasonal factors
        weather_factor = self._calculate_weather_factor(weather_data)
        seasonal_factor = self._calculate_seasonal_factor(date)
        activity_factor = self._calculate_activity_factor(date)
        
        predicted_amount = base_amount * weather_factor * seasonal_factor * activity_factor
        
        # Add some randomness to simulate real ML model
        noise = np.random.normal(0, 0.1)
        predicted_amount = max(0, predicted_amount * (1 + noise))
        
        return {
            'location': location,
            'date': date.strftime('%Y-%m-%d'),
            'predicted_waste_kg': round(predicted_amount, 1),
            'confidence': self.model_accuracy,
            'factors': {
                'weather_impact': round(weather_factor, 2),
                'seasonal_impact': round(seasonal_factor, 2),
                'activity_impact': round(activity_factor, 2)
            }
        }
    
    def _extract_features(self, location, date, weather_data):
        return {
            'location_encoded': hash(location) % 100,
            'day_of_week': date.weekday(),
            'month': date.month,
            'temperature': weather_data.get('temperature', 25),
            'wind_speed': weather_data.get('wind_speed', 10),
            'humidity': weather_data.get('humidity', 70)
        }
    
    def _calculate_weather_factor(self, weather_data):
        temp = weather_data.get('temperature', 25)
        wind = weather_data.get('wind_speed', 10)
        
        # Higher temperature and wind increase debris
        temp_factor = 1 + (temp - 25) * 0.02
        wind_factor = 1 + (wind - 10) * 0.03
        
        return max(0.5, min(2.0, temp_factor * wind_factor))
    
    def _calculate_seasonal_factor(self, date):
        month = date.month
        # Monsoon season (June-September) increases debris
        if month in [6, 7, 8, 9]:
            return 1.4
        # Tourist season (October-March) increases debris
        elif month in [10, 11, 12, 1, 2, 3]:
            return 1.2
        else:
            return 1.0
    
    def _calculate_activity_factor(self, date):
        # Weekend increases activity
        if date.weekday() in [5, 6]:  # Saturday, Sunday
            return 1.3
        # Friday evening effect
        elif date.weekday() == 4:  # Friday
            return 1.1
        else:
            return 1.0

# Generate predictions for next 7 days
def generate_weekly_predictions():
    model = WastePredictionModel()
    locations = ['Versova Beach', 'Juhu Beach', 'Marine Drive', 'Chowpatty']
    
    predictions = []
    
    for i in range(7):
        date = datetime.now() + timedelta(days=i)
        weather_data = {
            'temperature': 25 + np.random.normal(0, 3),
            'wind_speed': 12 + np.random.normal(0, 4),
            'humidity': 70 + np.random.normal(0, 10)
        }
        
        for location in locations:
            prediction = model.predict_waste_collection(location, date, weather_data)
            predictions.append(prediction)
    
    return predictions

# Run predictions and save results
if __name__ == "__main__":
    predictions = generate_weekly_predictions()
    
    # Save to JSON file for frontend consumption
    with open('waste_predictions.json', 'w') as f:
        json.dump(predictions, f, indent=2)
    
    print(f"Generated {len(predictions)} predictions")
    print("Sample prediction:")
    print(json.dumps(predictions[0], indent=2))
