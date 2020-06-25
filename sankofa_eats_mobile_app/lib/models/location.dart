class Location{
  final double lat;
  final double lng;

  Location({this.lat, this.lng});

  Location.fromJson(List<dynamic> parsedJson)
  :lat = parsedJson[1],
  lng = parsedJson[0];
}