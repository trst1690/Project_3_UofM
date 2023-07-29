import requests
from pprint import pprint 

base_url = "https://developer.nps.gov/api/v1"
api_format = "json"

API_KEY = "eN2ccjSW3Md5rG2yUSu0swwxVygcBiv7pzS7Tq1K"
nps_parks_response = requests.get(f"{base_url}/parks?&limit=500&api_key={API_KEY}").json()


pprint(nps_parks_response)
