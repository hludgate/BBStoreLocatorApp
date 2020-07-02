

import "package:flutter/material.dart";
import 'package:flutter/widgets.dart';
import 'package:sankofaeats/screens/search.dart';
import 'package:sankofaeats/widgets/bottom_navigation_icons.dart';


import 'package:sankofaeats/widgets/custom_text.dart';

import '../commons.dart';class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: green,
      body: SafeArea(  //so it's under top banner of phone
    child: ListView(
    children: <Widget>[
      Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Image.asset("assets/images/logo.png", width: 260, ),
        ),


      ],

    ),
      Align(
        alignment: Alignment.center,
      child: CustomText(
        text: "Black Owned Restaurants in the DMV",
        size: 18
      ),
      ),
      SizedBox(height: 5,),
      Container(
        decoration: BoxDecoration(
            color: white,
            boxShadow: [
              BoxShadow(
                  color:grey[300],
                  offset: Offset(1,1),
                  blurRadius: 4
              )
            ]
        ),
        child: ListTile(
          leading: Icon(Icons.search, color: red,),
          title: TextField(
            decoration: InputDecoration(
                hintText: "Find food and restaurants near me",
                border: InputBorder.none
            ),
          ),
          trailing: Icon(Icons.filter_list, color: red,),
        ),
      ),
      SizedBox(
        height: 5,
      ),
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: CustomText(text: "Featured", size: 20, color: black,),
      ),
    ],

    )
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
                    image: "map.png",
                    name: "Map"
                ),
                onPressed: () {
                    Navigator.push(context, MaterialPageRoute(builder: (context) => Search()),
                    );

                },
              )



            ],
          )
      ),
    );
  }
}
