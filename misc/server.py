#!/usr/bin/python

import os, sys, requests, json
from datetime import datetime
import time
import random

myCMD = sys.argv[2];

def callWebservicePost(entity, jsonString): #set up the url and headers# fast server
  urlF = "http://35.163.116.152:8080/SensorThingsServer-1.0/v1.0/" + entity# slow server
  urlS = "http://35.162.114.82:8080/SensorThingsServer-1.0/v1.0/" + entity# slow server
  urlVM = "http://192.168.56.101:8080/SensorThingsServer-1.0/v1.0/" + entity

  userURL = "http://" + sys.argv[1] + "/SensorThingsServer-1.0/v1.0/" + entity
  headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }

  #Use requests module to send a POST request
  request = requests.post(userURL, data = json.dumps(jsonString), headers = headers)

  # print the status code and the response as a json or text.
  print(request.status_code)
  # status - code should be 201, to let us know the entity has been created
  print("Content-Length:   " + request.headers["Content-Length"])
  print(request.headers)


  if request.status_code != 201: #print error
    print(request.text)
    print("Error")
  else :#do something with response
    print("Success:  " + str(random.randrange(0, 100, 2)))

# Observation
if myCMD == "o" and __name__ == '__main__':
  dsID = int(sys.argv[3])
  while (True): #Create a json string
    dtNow = datetime.now()
    currentTime = dtNow.isoformat()
    value = random.randrange(0, 101, 2)
    print("Pushing to server: " + str(value))
    jsonString = {"phenomenonTime": currentTime,"resultTime": currentTime,"result": value,"Datastream": {"@iot.id": dsID}}
    #Call method in order to perform a POST request to the webservice
    callWebservicePost("Observations", jsonString)
    time.sleep(5)

# Thing
if myCMD == "t" and __name__ == '__main__':
  myName = sys.argv[3]
  # Create a json string
  coord = [-117.123, 54.123]

  properties = {"property1": "it's waterproof","property2": "it glows in the dark","property3": "it repels insects"}
  location = {"type": "Point","coordinates": coord}
  locations = [{"name": myName + " location","description": myName + "location description","encodingType": "application/vnd.geo+json","location": location}]
  sensor = {"name": myName + " Sensor","description": myName + " Sensor Description","encodingType": "http://schema.org/description","metadata": "Calibration date: Jan 11, 2015"}
  uoM = {"name": "Celsius","symbol": "C","definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#Celsius"}
  observedP = {"name": "Temperature","definition": "http://www.qudt.org/qudt/owl/1.0.0/quantity/Instances.html#Temperature","description": "Temperature of the camping site"}
  obsType = "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement"
  datastreams = [{"Sensor": sensor,"unitOfMeasurement": uoM,"name": myName + " Datastream","description": myName + " Datastream Description","observationType": obsType,"ObservedProperty": observedP}]
  jsonString = {"name": myName + "Thing","description": myName + "description","properties": properties,"Locations": locations,"Datastreams": datastreams}
  #Call method in order to perform a POST request to the webservice
  callWebservicePost("Things", jsonString)

# Thing Wit Location
if myCMD == "tl" and __name__ == '__main__':
  myName = sys.argv[3]
  # Create a json string
  coord = [float(sys.argv[4]), float(sys.argv[5])]

  properties = {"property1": "it's waterproof","property2": "it glows in the dark","property3": "it repels insects"}
  location = {"type": "Point","coordinates": coord}
  locations = [{"name": myName + " location","description": myName + "location description","encodingType": "application/vnd.geo+json","location": location}]
  sensor = {"name": myName + " Sensor","description": myName + " Sensor Description","encodingType": "http://schema.org/description","metadata": "Calibration date: Jan 11, 2015"}
  uoM = {"name": "Celsius","symbol": "C","definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#Celsius"}
  observedP = {"name": "Temperature","definition": "http://www.qudt.org/qudt/owl/1.0.0/quantity/Instances.html#Temperature","description": "Temperature of the camping site"}
  obsType = "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement"
  datastreams = [{"Sensor": sensor,"unitOfMeasurement": uoM,"name": myName + " Datastream","description": myName + " Datastream Description","observationType": obsType,"ObservedProperty": observedP}]
  jsonString = {"name": myName + "Thing","description": myName + "description","properties": properties,"Locations": locations,"Datastreams": datastreams}
  #Call method in order to perform a POST request to the webservice
  callWebservicePost("Things", jsonString)

# Location
if myCMD == "l" and __name__ == '__main__':
  myName = sys.argv[3]
  thingID = sys.argv[4]
  while (True): #Create a json string
    coord = [8.4 + random.randrange(0, 100, 2) / 1000, 49 + random.randrange(0, 100, 2) / 1000]
    jsonString = {"name": myName + "Location","description": myName + "description","encodingType": "application/vnd.geo+json","location": {"type": "Point","coordinates": coord}}

    #Call method in order to perform a POST request to the webservice
    callWebservicePost("Things(" + thingID + ")/Locations", jsonString)
    time.sleep(5)

# Location
if myCMD == "lv" and __name__ == '__main__':
  myName = sys.argv[3]
  thingID = sys.argv[4]
  coord = [float(sys.argv[5]), float(sys.argv[6])]
  jsonString = {"name": myName + "Location","description": myName + "description","encodingType": "application/vnd.geo+json","location": {"type": "Point","coordinates": coord}}
  #Call method in order to perform a POST request to the webservice
  callWebservicePost("Things(" + thingID + ")/Locations", jsonString)

# all
if myCMD == "a" and __name__ == '__main__':
  myName = sys.argv[3]
  thingID = sys.argv[4]
  while (True): #Create a json string
    coord = [8.4 + random.randrange(0, 100, 2) / 1000, 49 + random.randrange(0, 100, 2) / 1000]
    jsonString = {"name": myName + "Location","description": myName + "description","encodingType": "application/vnd.geo+json","location": {"type": "Point","coordinates": coord}}

    #Call method in order to perform a POST request to the webservice
    callWebservicePost("Things(" + thingID + ")/Locations", jsonString)


    dsID = int(sys.argv[5])# Create a json string
    dtNow = datetime.now()
    currentTime = dtNow.isoformat()
    jsonString = {"phenomenonTime": currentTime,"resultTime": currentTime,"result": random.randrange(0, 101, 2),"Datastream": {"@iot.id": dsID}}
    #Call method in order to perform a POST request to the webservice
    callWebservicePost("Observations", jsonString)
    time.sleep(5)
