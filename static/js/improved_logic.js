// Create a map object
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"
var myMap = L.map("map-id", {
  center: [37.98, 23.72],
  zoom: 2
});
  // Magnitude is on a log10 scale, so a linear increase in radius wouldn't make sense
  // But the increase already isn't linear, so circle size is adjusted magnitude deivided by area formula.
  // This way an earthquate that is 10x worse will have a circle with 10x more area
  function markerSize(magnitude) {
    return ((magnitude ** 10)) / (3.14 * magnitude ** 2);
  }
  function colorize(dep) {
    if (dep <= 0) {
      return "#388000"
    }
    else if (dep <= 10) {
      return "#6B9F00"
    }
    else if (dep <= 20) {
      return "#ABBF00"
    }
    else if (dep <= 30) {
      return "#DFD000"
    }
    else if (dep <= 40) {
      return "#FFB400"
    }
    else if (dep <= 50) {
      return "#FF9100"
    }
    else if (dep <= 60) {
      return "#FF7F00"
    }
    else if (dep <= 70) {
      return "#FF6C00"
    }
    else if (dep <= 80) {
      return "#FF5700"
    }
    else {
      return "#FF4200"
    }
  }
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


  // Loop through the cities array and create one marker for each earthquake
  features.forEach(feature => {
  let lon = feature.geometry.coordinates[0]
  let lat = feature.geometry.coordinates[1]
  let depth = feature.geometry.coordinates[2]
  let coords = [lat, lon]
  let mag = feature.properties.mag
  let place = feature.properties.place
  let color = colorize(depth)
    L.circle(coords, {
      fillOpacity: 0.5,
      color: color,
      fillColor: color,
      weight: 1,
      radius: markerSize(mag)
    }).bindPopup(`<h3>${place}<br>Magnitude: ${mag}<br>Depth: ${depth}</h3>`).addTo(myMap);
})
});
//The legend
var legend = L.control({
  position: "bottomright"
});

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");

  var depths = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  div.innerHTML += "<h3>Depth</h3>"
  // Looping through
  for (var i = 0; i < depths.length; i++) {
    depth = depths[i]
    div.innerHTML +=
      "<i style='background: " + colorize(depth) + "'></i> " +
      depth + (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+");
  }
  return div;
};

// Finally, we our legend to the map.
legend.addTo(myMap);