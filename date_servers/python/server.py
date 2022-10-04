from fastapi import FastAPI
import datetime
import requests
import json
app = FastAPI()

@app.get("/date")
def _():
    data={ "date": datetime.datetime.utcnow().isoformat() }
    return data; 

@app.get("/date_received")
def _():
     return requests.get("http://localhost:8080/date").json()