
var overlayMaps = {}; // Empty object to store overlay maps

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
  .then(data => {
      var earthquakeMarkers = L.layerGroup(); // Create a layer group for earthquake markers

      data.features.forEach(feature => {
          var coordinates = feature.geometry.coordinates;
          var magnitude = feature.properties.mag;
          var depth = coordinates[2];
          var markerSize = (magnitude * 2); // Adjust marker size based on magnitude
          var color;
          if (depth < 50) {
              color = "#00FF00"; // Green
          } else if (depth < 100) {
              color = "#FFFF00"; // Yellow
          } else {
              color = "#FF0000"; // Red
          }
          var marker = L.circleMarker([coordinates[1], coordinates[0]], {
              radius: markerSize,
              fillColor: color,
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
          });
          marker.bindPopup(`<b>${feature.properties.title}</b><br>Magnitude: ${feature.properties.mag}<br>Depth: ${depth} km`).openPopup();
          earthquakeMarkers.addLayer(marker); // Add marker to the layer group
      });

      overlayMaps["Earthquakes"] = earthquakeMarkers; // Add earthquake markers as an overlay map
      earthquakeMarkers.addTo(map); // Add earthquake markers to the map
  })
  .catch(error => {
      console.error('Error fetching earthquake data:', error);
  });


let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors'
});

var baseMaps = {
"Street Map": street,
"Topographic Map": topo
};

var map = L.map('map', {
center: [0, 0],
zoom: 2,
layers: [topo]
});

map.setView([20, -40], 2); // Center the map over the Atlantic Ocean

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);