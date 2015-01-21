var shp = require('shpjs'),
    L = require('leaflet');
    shpEl = document.getElementById("shapefile");



L.Icon.Default.imagePath = 'http://cdn.leafletjs.com/leaflet-0.7.3/images';
var addToMap = function (gj) {
  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  var geojsonLayer = L.geoJson(gj.features, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  }).addTo(map);
  map.fitBounds(geojsonLayer.getBounds());
}

var createTd = function (prop, tr) {
  var td = document.createElement("td");
  td.innerHTML = prop;
  tr.appendChild(td);
  return tr;
};

var addTable = function (gj) {
  var table = document.getElementById('table');
  var thead = document.createElement('thead');
  Object.keys(gj.features[0].properties).forEach(function (prop) {
    var th = document.createElement('th');
    th.innerHTML = prop;
    thead.appendChild(th);
  });
  var tbody = document.createElement('tbody');
  gj.features.forEach(function (feature) {
    var tr = document.createElement("tr");
    for (i in feature.properties) {
      var prop = feature.properties[i];
      var el = createTd(prop, tr);
    }
    tbody.appendChild(tr);
  });
  table.appendChild(thead);
  table.appendChild(tbody);
};

shpEl.addEventListener("change", handleFiles, false);
function handleFiles() {
  var fileList = this.files; /* now you can work with the file list */
  var reader = new FileReader();
  reader.onloadend = function (progress, buff) {
    var zip = shp.parseZip(this.result);
    addToMap(zip);
    addTable(zip);

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
