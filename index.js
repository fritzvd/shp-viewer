var shp = require('shpjs'),
    L = require('leaflet');
    shpEl = document.getElementById("shapefile");



var addToMap = function (gj) {
  var geojsonLayer = L.geoJson(gj.features).addTo(map);
  map.fitBounds(geojsonLayer.getBounds());
}

shpEl.addEventListener("change", handleFiles, false);
function handleFiles() {
  var fileList = this.files; /* now you can work with the file list */
  var reader = new FileReader();
  reader.onloadend = function (progress, buff) {
    var zip = shp.parseZip(this.result);
    addToMap(zip);

  };
  reader.readAsArrayBuffer(this.files[0]);
};

var map = L.map('map', {
  center: [51.0, 4.1],
  zoom: 10
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
