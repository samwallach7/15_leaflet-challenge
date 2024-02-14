const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(url).then(function(data) {

    var features = data.features;
    var metadata = data.metadata;

    console.log(features);
});

// Define variables for our tile layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Only one base layer can be shown at a time.
let baseMaps = {
  Street: street,
  Topography: topo
};

// Overlays that can be toggled on or off
// let overlayMaps = {
//   Cities: cityLayer
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


// Add all the cityMarkers to a new layer group.
// Now, we can handle them as one group instead of referencing each one individually.
// let cityLayer = L.layerGroup(cityMarkers);

