import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:sankofaeats/models/geometry.dart';
import 'package:sankofaeats/models/properties.dart';

class Place{
  final Properties properties;
  final Geometry geometry;
  final BitmapDescriptor icon;

  Place({this.geometry, this.properties, this.icon});

  Place.fromJson(Map<dynamic, dynamic> parsedJson, BitmapDescriptor icon)
  :properties = Properties.fromJson(parsedJson['properties']),
  geometry = Geometry.fromJson(parsedJson['geometry']),
  icon = icon;

}