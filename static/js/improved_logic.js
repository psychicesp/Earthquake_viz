// Create a map object
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"
var myMap = L.map("map-id", {
  center: [37.98, 23.72],
  zoom: 2
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

d3.json(queryUrl, function (data) {
  console.log(data)
  var features = data.features

  // Define a markerSize function that will give each city a different radius based on its population
  function markerSize(magnitude) {
    return magnitude*25000;
  }

  // Loop through the cities array and create one marker for each city object
  features.forEach (feature => {
    let lon = feature.geometry.coordinates[0]
    let lat = feature.geometry.coordinates[1]
    let depth = feature.geometry.coordinates[2]
    let coords = [lat,lon]
    let mag = feature.properties.mag
    let place = feature.properties.place
    L.circle(coords, {
      fillOpacity: 0.6,
      color: "white",
      fillColor: "purple",
      radius: markerSize(mag)
    }).bindPopup(`<h3>${place}<br>Magnitude:${mag}</h3>`).addTo(myMap);
  })
});