const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(url).then(function(data) {

    var features = data.features;
    var metadata = data.metadata;

    console.log(features);
});

// Function to determine 
function markerSize(magnitude) {
  return features.properties.mag;
}

//Define array to hold the created earthquake marker
let earthquakeMarkers = [];

// Loop through earthquakes and create markers
// for (let i = 0; i < features.length; i++) {
//   earthquakeMarkers.push(
//     L.circle(features[i].geometry.coordinates, {
//       stroke: false,
//       fillOpacity: 0.75,
//       color: "White",
//       fillColor: "White",
//       radius: markerSize(features[i].properties.mag)
//     })
//   )
// }


// Create the base tile layers
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create layer groups
// let earthquakes = L.layerGroup(earthquakeMarkers);

// Create a basemaps object
let baseMaps = {
  Street: street,
  Topography: topo
};

// Create overlay object
// let overlayMaps = {
//   Earthquakes: earthquakes
// };

// Create a map object, and set the default layers.
let myMap = L.map("map", {
    center: [20.07, -10.47],
    zoom: 2.5,
  layers: [street]
});

// Pass our map layers into our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps).addTo(myMap);


