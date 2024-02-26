var map = L.map('map').setView([-30, 0], 2); // Set initial view

// Define base layers
var baseMaps = {
    "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
};

// Load JSON data
$.getJSON('PB2002_boundaries.json')
    .done(function(data) {
        // Convert JSON data to GeoJSON format
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

        // Add GeoJSON layer containing the LineString features to the map
        L.geoJSON(geoJsonData).addTo(map);
    })
    .fail(function(error) {
        console.error('Error loading JSON data:', error);
    });

// Add base maps to layer control
L.control.layers(baseMaps).addTo(map);