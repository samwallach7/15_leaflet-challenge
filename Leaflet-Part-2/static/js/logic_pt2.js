// Initialize Leaflet map
var map = L.map('map', {
    center: [0, 0],
    zoom: 2,
    scrollWheelZoom: true // Enable scroll wheel zoom
});

// Define base layers
var baseMaps = {
    "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
    "Topographic View": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors'
    }).addTo(map)
};

// Define overlay maps
var overlayMaps = {}; // Empty object to store overlay maps
var earthquakeMarkers = []; // Array to store earthquake markers

// Set default view
map.setView([20, -40], 2); // Center the map over the Atlantic Ocean

// Load earthquake data with D3
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
    .then(function(data) {
        // Process earthquake data and create markers
        data.features.forEach(function(feature) {
            var coordinates = feature.geometry.coordinates;
            var magnitude = feature.properties.mag;
            var depth = coordinates[2];
            var markerSize = (magnitude * 2.5); // Adjust marker size based on magnitude
            var color;
            if (depth < 30) {
                color = "lightgreen";
            } else if (depth < 60) {
                color = "yellow";
            } else if (depth < 90) {
                color = "orange";
            } else {
                color = "red";
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
            earthquakeMarkers.push(marker); // Push marker to the array
        });

        // Add earthquake markers as an overlay map
        overlayMaps["Earthquakes"] = L.layerGroup(earthquakeMarkers).addTo(map);

        // Add base and overlay maps to layer control
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(map);

        // Add legend
        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function(map) {
            var div = L.DomUtil.create('div', 'legend');
            div.innerHTML += '<h4>Depth</h4>';
            div.innerHTML += '<div class="legend-item"><span class="legend-color" style="background-color: lightgreen;"></span> -10-30</div>';
            div.innerHTML += '<div class="legend-item"><span class="legend-color" style="background-color: yellow;"></span> 30-60</div>';
            div.innerHTML += '<div class="legend-item"><span class="legend-color" style="background-color: orange;"></span> 60-90</div>';
            div.innerHTML += '<div class="legend-item"><span class="legend-color" style="background-color: red;"></span> 90+</div>';
            return div;
        };
        legend.addTo(map);
    })
    .catch(function(error) {
        console.error('Error fetching earthquake data:', error);
    });

$.getJSON('PB2002_boundaries.json')
    .done(function(data) {
        var geoJsonData = {
            type: 'FeatureCollection',
            features: data.features.map(function(feature) {
                return {
                    type: 'Feature',
                    properties: feature.properties,
                    geometry: feature.geometry
                };
            })
        };
        // Add GeoJSOn layer containing the LineString features to the map
        L.geoJSON(geoJsonData).addTo(map);
    })
    .fail(function(error) {
        console.error('Error loading JSON data:', error);
    });