from typing import Dict

from agent.tools.data_providers.RapidDataProviderBase import RapidDataProviderBase, EndpointSchema

# https://rapidapi.com/maruf111/api/weather-api167
class WeatherProvider(RapidDataProviderBase):
    def __init__(self):
        endpoints: Dict[str, EndpointSchema] = {
            "current_weather": {
                "route": "/api/weather/current",
                "method": "GET",
                "name": "Current Weather Info",
                "description": "Provides accurate and up-to-date information on temperature, humidity, wind speed, visibility, and more for any location worldwide.",
                "payload": {
                    "lon": "Optional Longitude coordinate(Note. lat and lon value has priority over both place and zip value). use the lat and lon for more accurate and reliable weather data.",
                    "lat": "Optional Latitude coordinate(Note. lat and lon value has priority over both place and zip value). use the lat and lon for more accurate and reliable weather data.",
                    "place": "Optional city name, state code (only for the US) and country code divided by comma use like Zion,VA,US . Please use ISO 3166 country codes. Note. place value has priority over zip value.",
                    "zip": "Optional zip code with optional country code(Note. Zip value will only be used if both lat,lon and place name not provided).",
                    "units": "Optional Unit type (standard, metric, and imperial).",
                    "lang": "Optional language type.",
                    "mode": "Optional mode type."
                }
            },
        }
        base_url = "https://weather-api167.p.rapidapi.com"
        super().__init__(base_url, endpoints)


if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()
    tool = WeatherProvider()

    # Example for getting current weather
    current_weather = tool.call_endpoint(
        route="current_weather",
        payload={
            "lon": "",
            "lat": "",
            "place": "London,GB",
            "zip": "",
            "units": "",
            "lang": "en",
            "mode": "json"
        }
    )
    print("Current Weather:", current_weather)
  