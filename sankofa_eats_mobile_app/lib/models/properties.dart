class Properties{
  final String address;
  final String directions;
  final String name;
  final String phoneFormatted;
  final String website;
  final String type;

  Properties({this.address, this.directions, this.name, this.phoneFormatted, this.website, this.type});

  Properties.fromJson(Map<dynamic,dynamic> parsedJson)
      :address = parsedJson['Address'],
        directions = parsedJson['Directions'],
      name = parsedJson['Name'],
      phoneFormatted = parsedJson['phoneFormatted'],
      website = parsedJson['Website'],
      type = parsedJson['Type'];
}