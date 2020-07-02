import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:provider/provider.dart';
import 'package:geolocator/geolocator.dart';
import 'package:sankofaeats/services/geolocator_service.dart';
import 'package:sankofaeats/services/marker_service.dart';
import 'package:sankofaeats/widgets/bottom_navigation_icons.dart';
import 'package:url_launcher/url_launcher.dart';
import '../commons.dart';
import '../models/place.dart';
import 'home.dart';

class Search extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final currentPosition = Provider.of<Position>(context);
    final placesProvider = Provider.of<Future<List<Place>>>(context);
    final geoService = GeoLocatorService();
    final markerService = MarkerService();
    Completer<GoogleMapController> _controller = Completer();
    return FutureProvider(
      create: (context) => placesProvider,
      child: Scaffold(
        backgroundColor: green,
        body: (currentPosition != null)
            ? Consumer<List<Place>>(
          builder: (_, places, __) {
            var markers = (places != null) ? markerService.getMarkers(places) : List<Marker>();
            return (places != null)
                ? Column(
              children: <Widget>[
                SafeArea(
                  child: Container(
                    height: MediaQuery.of(context).size.height *2 / 3,
                    width: MediaQuery.of(context).size.width,
                    child: GoogleMap(

                      initialCameraPosition: CameraPosition(
                          target: LatLng(38.89511,    //this makes it start on DC since it was a pain for me to scroll over there from my location
                              -77.03637),   // change to currentPosition.latitude and longitude if you want
                          zoom: 9.0),
                      zoomGesturesEnabled: true,
//            onMapCreated: (GoogleMapController controller) {
//            _controller.complete(controller);
//            },
                        markers: Set<Marker>.of(markers),


                    ),
                  ),
                ),
                SizedBox(
                  height: 10.0,
                ),
                Expanded(
                  child: ListView.builder(
                      itemCount: places.length,
                      itemBuilder: (context, index) {
                        return FutureProvider(
                          create: (context) =>
                              geoService.getDistance(
                                  currentPosition.latitude,
                                  currentPosition.longitude,
                                  places[index]
                                      .geometry
                                      .location
                                      .lat,
                                  places[index]
                                      .geometry
                                      .location
                                      .lng),
                          child: Card(
                            child: ListTile(
                                title: Text(places[index].properties.name),
                                subtitle: Column(
                                    crossAxisAlignment:
                                    CrossAxisAlignment.start,
                                      children : <Widget>[
                                        Row(
                                          children: <Widget>[
                                            Expanded(
                                                child: Consumer<double>(
                                                    builder: (context, meters, widget){
                                                      return (meters != null)
                                                          ? Text('${places[index].properties.address}')
                                                          : Container();
                                                    }
                                                )
                                            )
                                          ],
                                        ),
                                Row(children: <Widget>[
                                  Expanded(
                                  child: Consumer<double>(
                                    builder: (context, meters, widget){
                                      return (meters != null)
                                          ? Text('${places[index].properties.phoneFormatted}    ${(meters/1609).round()} mi')

                                          : Container();
                                    }
                                  )
                                  )
                                ]
                                )

                        ]),
                                trailing: IconButton(
                                  icon: Icon(Icons.directions),
                                  color:
                                  Theme.of(context).primaryColor,
                                  onPressed: () {
                                    final url = places[index].properties.directions;
                                    launch(url);

                                  },
                                )
                            ),
                          ),
                        );
                      }),
                )
              ],
            ) : Center(child : CircularProgressIndicator());
          },
        )
            : Center(
          child: CircularProgressIndicator(),
        ),
        bottomNavigationBar: Container(
            height: 70,
            color: green,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                RaisedButton(
                  color: green,
                  child: BottomNavIcon(
                      image: "home.png",
                      name: "Home"
                  ),
                  onPressed: () {
                    Navigator.pop(context);


                  },
                )



              ],
            )
        ),
      ),
    );
  }
  void _launchMapsUrl(double lat, double lng) async {
    final url = 'https://www.google.com/maps/search/?api=1&query=$lat,$lng';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

}