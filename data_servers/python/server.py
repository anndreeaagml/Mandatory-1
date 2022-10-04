from fastapi import FastAPI
import uvicorn
import json
import xml.etree.ElementTree as ET
import csv
import yaml

app = FastAPI()

@app.get("/csv")
def _():
    jsonArray = []
    with open('../files/cameras.csv', encoding='utf-8') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            jsonArray.append(row)
    return jsonArray

@app.get("/json")
def _():
    with open('../files/cameras.json', encoding='utf-8') as jsonfile:
        return json.load(jsonfile)

@app.get("/xml")
def _():
    tree = ET.parse('../files/cameras.xml')
    root = tree.getroot()
    y=root.tag + ': '
    for x in root:
        y=y+ " [ "+x.tag + " : " +x.text + " ] "
    return y

@app.get("/yaml")
def _():
    with open('../files/cameras.yaml', encoding='utf-8') as stream:
        try:
            return yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            return exc

@app.get("/txt")
def _():
    with open('../files/cameras.txt', encoding='utf-8') as txtfile:
        return [(line.strip()) for line in txtfile.readlines()]


