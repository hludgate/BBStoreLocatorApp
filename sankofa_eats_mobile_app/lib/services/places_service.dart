import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:sankofaeats/models/place.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;

class PlacesService {
  final key = 'AIzaSyB3rnNIIugBjFOqaFxUPycoLgF7bbKL4yc';

  Future<List<Place>> getPlaces(double lat, double lng, BitmapDescriptor icon) async {
      var response = await http.get('https://raw.githubusercontent.com/hludgate/BBStoreLocatorApp/master/temp_list.geojson');
      if (response.statusCode == 200) {
        var temp = response.body;
        var json = convert.jsonDecode(response.body);
        var jsonResults = json as List;
        return jsonResults.map((place) => Place.fromJson(place, icon)).toList();
      }
      else {
        throw Exception('Failed to load album');
      }

  }

}
