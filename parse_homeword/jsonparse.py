import json
from pydoc import text
import xml.etree.ElementTree as ET
import csv
import yaml

#json
with open('./files/cameras.json', 'r') as fcc_file:
    fcc_data = json.load(fcc_file)
    print(fcc_data)
print("\n")

#xml
tree = ET.parse('./files/cameras.xml')
root = tree.getroot()
print(root.tag)
for x in root:
    print(x.tag + " : " +x.text)
print("\n")

#csv
jsonArray = []
with open('./files/cameras.csv', encoding='utf-8') as csvf:
    csvReader = csv.DictReader(csvf)
    for row in csvReader:
        jsonArray.append(row)

print(jsonArray)
print("\n")

#yaml
with open("./files/cameras.yaml", "r") as stream:
    try:
        print(yaml.safe_load(stream))
    except yaml.YAMLError as exc:
        print(exc)
print("\n")

#txt
with open('./files/cameras.txt') as f:
    [print(line.strip(), end=' ') for line in f.readlines()]