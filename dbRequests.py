import requests
import json
from dotenv import load_dotenv
import os

load_dotenv("dh2024.env")
api_key = os.getenv('API_KEY')

def GET(database,collection):
    url = "https://us-east-1.aws.data.mongodb-api.com/app/data-sikvi/endpoint/data/v1/action/find"

    payload = json.dumps({
        "collection": f"{collection}",
        "database": f"{database}",
        "dataSource": "DeerHacks2024",
        "projection": None
    })
    headers = {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': f'{api_key}',
    }

    return requests.request("POST", url, headers=headers, data=payload).json()

def POST(database, collection, data):
    url = "https://us-east-1.aws.data.mongodb-api.com/app/data-sikvi/endpoint/data/v1/action/insertOne"

    payload = {
        "collection": collection,
        "database": database,
        "dataSource": "DeerHacks2024",
        "document": data  # Add the data you want to write to the database
    }

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': api_key  # Assuming api_key is defined somewhere in your code
    }

    # Send a POST request to insert data into the database
    response = requests.post(url, headers=headers, json=payload)

    # Check if the request was successful
    if response.status_code == 200 or response.status_code == 201:
        return "Data inserted successfully!"
    else:
        return f"Error: {response.status_code}"

def PATCH(ID,newData):
    url = f"https://us-east-1.aws.data.mongodb-api.com/data/{ID}"
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': api_key  # Assuming api_key is defined somewhere in your code
    }
    response = requests.patch(url, data=json.dumps(newData), headers=headers)




