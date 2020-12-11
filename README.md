# Leaflet Challenge:

This assignments' intent was to visualize a set of earthquake data found [here](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson)

Simply open index.html in a modern web browser or go to the Github Pages link [here](psychicesp.github.io/leaflet-challenge)

(normally I would gitignore the config.js to hide the key from scrapers, but this is an old key with no risk and I wanted Github Pages to work)

The area of the circle corresponds to the intensity of the earthquake (calculated with the radius of the circle equalling: magnitude<sup>10</sup>/(magnitude * pi<sup>2</sup>))

The color corresponds with the depth of the earthquake. 