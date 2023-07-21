from flask import Flask, jsonify
import requests
from pymongo import MongoClient

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

if __name__ == '__main__':
    app.run(debug=True)