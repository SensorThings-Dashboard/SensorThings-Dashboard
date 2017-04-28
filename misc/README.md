This README is using the Script misc/server.py

There are 6 different modi:

1) Create a Thing:
python server.py <ip:port> t <name>
This creates a Thing and you can retrieve the Thing ID from the URL printed after creating the Thing.

2) Create a Thing with special location:
python server.py <ip:port> tl <name> <longitude_float> <latitude_float>
This creates a Thing with the geometrical parameters longitude and latitude. You can retrieve the Thing ID from the URL printed after creating the Thing.

3) Update Location:
python server.py <ip:port> l <name> <ThingID>
This updates the Location of the specified Thing, you can retrieve the Location ID from the URL printed after creating the Location.

4) Update Location to specified geometrical position:
python server.py <ip:port> lv <name> <ThingID> <longitude_float> <latitude_float>
This updates the Location of the specified Thing to the specified position, you can retrieve the Location ID from the URL printed after creating the Location.

5) Update Observations:
python server.py <ip:port> o <dataStreamID>
This creates new Observations and adds them to the specified Datastream.

6) Update Location and Observations:
python server.py <ip:port> a <name> <ThingID> <dataStreamID>
This combines 3) and 5).
