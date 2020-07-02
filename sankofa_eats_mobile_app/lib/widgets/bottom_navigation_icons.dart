import "package:flutter/material.dart";

import 'custom_text.dart';

class BottomNavIcon extends StatelessWidget {
  final String image;
  final String name;

  const BottomNavIcon({Key key, this.image, this.name}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return  Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: <Widget>[
          Image.asset("assets/images/$image", width: 50,),
          //SizedBox(height: 5),
          //CustomText(text: name,)
        ],
      ),
    );
  }
}
