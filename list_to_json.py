# -*- coding: utf-8 -*-
"""
Created on Sun Jun 14 14:10:16 2020

@author: Henry
"""

import csv 
import json
from geopy.geocoders import Nominatim
import geojson
from geojson import Point, Feature, FeatureCollection, dump
import re


def phone_format(phone_number):
    clean_phone_number = re.sub('[^0-9]+', '', phone_number)
    formatted_phone_number = re.sub("(\d)(?=(\d{3})+(?!\d))", r"\1-", "%d" % int(clean_phone_number[:-1])) + clean_phone_number[-1]
    return formatted_phone_number

csvFilePath = 'list.csv'
jsonFilePath = 'list.geojson'
data = {}
features = []
geolocator = Nominatim(user_agent="temp")
id = 0
with open(csvFilePath) as file:
    reader = csv.DictReader(file)
    for rows in reader:
        name = rows['Name']
        add = rows['Address']
        phone = rows['Phone']
        format_phone = phone_format(phone)
        btype = rows['Type']
        web = rows['Website']
        location = geolocator.geocode(add)
        lat = location.latitude
        long = location.longitude
        point = Point((long,lat))
        prop = {"Name":name,"Address":add,"Phone":phone,"phoneFormatted":format_phone,"Type":btype,"Website":web}
        feat = Feature(geometry=point,properties=prop )
        features.append(feat)
        
feature_collection = FeatureCollection(features)

with open(jsonFilePath,'w') as f:
    f.write('var stores =')
    dump(feature_collection,f,sort_keys=True, indent=4)
        
        
        
        
        