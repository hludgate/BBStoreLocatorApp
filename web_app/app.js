/* This will let you use the .remove() function later on */
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }

mapboxgl.accessToken = 'pk.eyJ1IjoiaGx1ZGdhdGUiLCJhIjoiY2tiZDZwNWZ5MDkwNzJybnRkN2VteDYydyJ9.W8bL6WhPbXgG6flIQqRHgQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/hludgate/ckbd6q5yf0uu21ils2fvi9ud5',
  center: [-77.034084, 38.909671],
  zoom: 10
});






/**
       * Assign a unique id to each store. You'll use this `id`
       * later to associate each point on the map with a listing
       * in the sidebar.
      */
     stores.features.forEach(function(store, i){
        store.properties.id = i;
      });

      /**
       * Wait until the map loads to make changes to the map.
      */
      map.on('load', function (e) {
        /** 
         * This is where your '.addLayer()' used to be, instead
         * add only the source without styling a layer
        */
        map.addSource("places", {
          "type": "geojson",
          "data": stores
        });

        /**
         * Add all the things to the page:
         * - The location listings on the side of the page
         * - The markers onto the map
        */
        buildSorter();
        buildLocationList(stores.features);
        addMarkers();
        //addSubmitBox();
        //addGoogleForm();
        addRecLink();
        
      });

      function addRecLink()
      {
        var p = document.createElement('p');
        p.innerHTML = 'Are We Missing a Restaurant?'
        p.className = 'MissingLinkAlert'
        var link = document.createElement('a');
        link.innerHTML = "Click Here to Add to the List";
        link.href = "rec.html";
        var listings = document.getElementById('listings');
        var br = document.createElement("br");
        link.className = 'MissingLink';
        listings.appendChild(p);
        listings.appendChild(link);


      }
      function addGoogleForm() {
        var ifrm = document.createElement('iframe');
        ifrm.setAttribute('id','ifrm');
        ifrm.src = "https://docs.google.com/forms/d/e/1FAIpQLSe1Iq7xIgckzXbt55zhBiB8vggm5XvBPFF-nbmr0sL2GW_-eQ/viewform?embedded=true";
        ifrm.width = "100%";
        ifrm.height = "45%";
        var listings = document.getElementById('listings');
        listings.appendChild(ifrm);
      }

      
      function buildSorter() {
        var values = ["Alphabetical", "Nearest to Me"];
      
        var select = document.createElement("select");
        select.name = "sort";
        select.id = "sort"
      
        for (const val of values) {
          var option = document.createElement("option");
          option.value = val;
          option.text = val.charAt(0).toUpperCase() + val.slice(1);
          select.appendChild(option);
        }
      
        var label = document.createElement("label");
        label.innerHTML = "Sort by: "
        label.htmlFor = "sort";
      
        document.getElementById("container").appendChild(label).appendChild(select);
      }
      /**
       * Add a marker to the map for every store listing.
      **/
      function addMarkers() {
        /* For each feature in the GeoJSON object above: */
        stores.features.forEach(function(marker) {
          /* Create a div element for the marker. */
          var el = document.createElement('div');
          /* Assign a unique `id` to the marker. */
          el.id = "marker-" + marker.properties.id;
          /* Assign the `marker` class to each marker for styling. */
          el.className = 'marker';
          
          /**
           * Create a marker using the div element
           * defined above and add it to the map.
          **/
          new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

          /**
           * Listen to the element and when it is clicked, do three things:
           * 1. Fly to the point
           * 2. Close all other popups and display popup for clicked store
           * 3. Highlight listing in sidebar (and remove highlight for all other listings)
          **/
          el.addEventListener('click', function(e){
            /* Fly to the point */
            flyToStore(marker);
            /* Close all other popups and display popup for clicked store */
            createPopUp(marker);
            /* Highlight listing in sidebar */
            var activeItem = document.getElementsByClassName('active');
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            var listing = document.getElementById('listing-' + marker.properties.id);
            listing.classList.add('active');
          });
        });
      }

      /**
       * Add a listing for each store to the sidebar.
      **/
      function buildLocationList(data) {
        

        
        data.forEach(function(store, i){
          /**
           * Create a shortcut for `store.properties`,
           * which will be used several times below.
          **/
          var prop = store.properties;

          /* Add a new listing section to the sidebar. */
          var listings = document.getElementById('listings');
          var listing = listings.appendChild(document.createElement('div'));
          /* Assign a unique `id` to the listing. */
          listing.id = "listing-" + prop.id;
          /* Assign the `item` class to each listing for styling. */
          listing.className = 'item';

          /* Add the link to the individual listing created above. */
          var link = listing.appendChild(document.createElement('a'));
          link.href = '#';
          link.className = 'title';
          link.id = "link-" + prop.id;
          link.innerHTML = prop.Name;

          /* Add details to the individual listing. */
          var address = listing.appendChild(document.createElement('div'));
          address.innerHTML = prop.Address;
          var phone = listing.appendChild(document.createElement('div'));
          if (prop.Phone) {
            phone.innerHTML = prop.phoneFormatted;
          }

          var a1 = listing.appendChild(document.createElement('a'));
          if (prop.Website) {
            var linkText = document.createTextNode("Website");
            a1.appendChild(linkText);
            a1.innerHTML = "Website";
            a1.href = prop.Website;
            a1.className = 'link';
            var br = listing.appendChild(document.createElement("br"));
          }
          

          var a2 = listing.appendChild(document.createElement('a'));
          var dirText = document.createTextNode("Directions");
          a2.appendChild(dirText);
          a2.innerHTML = "Directions";
          a2.href = prop.Directions;
          a2.className = 'link';
          
          /**
           * Listen to the element and when it is clicked, do four things:
           * 1. Update the `currentFeature` to the store associated with the clicked link
           * 2. Fly to the point
           * 3. Close all other popups and display popup for clicked store
           * 4. Highlight listing in sidebar (and remove highlight for all other listings)
          **/
          link.addEventListener('click', function(e){
            for (var i=0; i < data.features.length; i++) {
              if (this.id === "link-" + data.features[i].properties.id) {
                var clickedListing = data.features[i];
                flyToStore(clickedListing);
                createPopUp(clickedListing);
              }
            }
            var activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
          });
        });
      }

      /**
       * Use Mapbox GL JS's `flyTo` to move the camera smoothly
       * a given center point.
      **/
      function flyToStore(currentFeature) {
        map.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 15
        });
      }

      /**
       * Create a Mapbox GL JS `Popup`.
      **/
      function createPopUp(currentFeature) {
        var popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();
        var popup = new mapboxgl.Popup({closeOnClick: false})
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML('<h3>' + currentFeature.properties.Name + '</h3>' +
            '<h4>' + currentFeature.properties.Address + '</h4>' +
            '<h4>' + currentFeature.properties.phoneFormatted + '</h4>' +
            '<a href = ' + currentFeature.properties.Directions + '>Directions</a>' + 
            
            '<a href = ' + currentFeature.properties.Website + '>Website</a>')
          .addTo(map);
      }

      function calculateDistance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var radlon1 = Math.PI * lon1/180;
        var radlon2 = Math.PI * lon2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 };
        if (unit=="N") { dist = dist * 0.8684 };
        return dist;
      }

      document.getElementById('Sort').onclick = function() {
        var sort = document.getElementById("container")
        var s = sort.options[sort.selectedIndex].value;
        var listings = document.getElementById('listings');
        listings.textContent = '';
        rebuildLocationList(stores.features,s);
        addRecLink();
      }

      function rebuildLocationList(data,sort) {
        if (sort == 1) {
          buildLocationList(data);
        }
        if (sort == 2) {
          
          var new_data = data.sort( function( a, b ) {
            a = a.properties.Name.toLowerCase();
            b = b.properties.Name.toLowerCase();
        
            return a < b ? -1 : a > b ? 1 : 0;
          });
          buildLocationList(new_data);
        }
        /*
        if (sort ==3) {

          if (navigator.geolocation) {

            function getLocation() {
        
              navigator.geolocation.getCurrentPosition(showPosition);
           
          }
          function showPosition(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var new_data = data
            data.forEach(function(store, i) {
              new_data["distance"] = calculateDistance(store.geometry.coordinates[0],store.geometry.coordinates[1],lat,long,"K");
            });
            
            new_data.sort(function(a, b) { 
              return a.distance - b.distance;
            });
            buildLocationList(new_data);
    
          }  
          */

          
          

        
        }
      
    
      

      
 
