from flask import Flask, jsonify
import requests
from pymongo import MongoClient
#from markupsafe import soft_unicode
#from watchdog.events import EVENT_TYPE_OPENED


app = Flask(__name__)
BASE_URL = "https://developer.nps.gov/api/v1"
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "my_database"
COLLECTION_NAME = "nps_data"
API_KEY = "eN2ccjSW3Md5rG2yUSu0swwxVygcBiv7pzS7Tq1K"
def fetch_and_store_data():
    headers = {"Authorization": f"Bearer {API_KEY}"}
    response = requests.get(f"{BASE_URL}/parks?&limit=500&api_key={API_KEY}")
    data = response.json()

    if 'data' in data:
        parks_data = data['data']

        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        collection.insert_many(parks_data)

        return True
    else:
        return False

@app.route('/get_all_parks', methods=['GET'])
def get_all_parks():
    if fetch_and_store_data():
        return jsonify({"message": "Data fetched and stored successfully."})
    else:
        return jsonify({"error": "Failed to fetch data from API"}), 500


@app.route('/get_lat_lon' , methods=['GET'])
def get_lat_lon():
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    data2 = collection.find()

    lat_lon_data = []

    for park in data2:
        if 'latitude' in park and 'longitude' in park:
            lat , lon = park['latitude'], park['longitude']
            
            images = park.get('images', [])
            image_url = images[0]['url'] if images else ''
        
        if images and 'caption' in images[0]:
                image_caption = images[0]['caption']
        else:
                image_caption = '' 

        lat_lon_data.append(
                {"lat":lat, 
                 'lon': lon, 
                 'name': park['fullName'], 
                 'Image': image_url,
                 'Image Caption': image_caption})
    
    return jsonify(lat_lon_data)


if __name__ == '__main__':
    app.run(debug=True)
