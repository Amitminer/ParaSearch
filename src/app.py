from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("API_KEY")
CSE_ID = os.getenv("CSE_ID")

def google_search(query, start=1, search_type=None):
    """Fetch search results from Google Custom Search API."""
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "q": query,
        "key": API_KEY,
        "cx": CSE_ID,
        "start": start,
    }

    if search_type == 'image':
        params["searchType"] = "image"

    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.text}

@app.route("/api/search", methods=["GET"])
def search():
    query = request.args.get("q")
    start = int(request.args.get("start", 1))
    search_type = request.args.get("type")

    if not query:
        return jsonify({"error": "No query provided"}), 400

    results = google_search(query, start=start, search_type=search_type)
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
