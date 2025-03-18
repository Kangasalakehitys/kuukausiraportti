//Data import
import {kangasalaBorders} from "../data/maps/kangasala_geojson.js";
import {kangasalaTilasto} from "../data/maps/kangasala-tilasto_geojson.js";
import {mergeAB} from "../pages/vaesto/vaesto_osa.js";

function getColor(d) {
  return d > 7000 ? '#800026' :
         d > 6000  ? '#BD0026' :
         d > 5000  ? '#E31A1C' :
         d > 4000  ? '#FC4E2A' :
         d > 3000   ? '#FD8D3C' :
         d > 2000   ? '#FEB24C' :
         d > 1000   ? '#FED976' :
                    '#FFEDA0';
}

console.warn(mergeAB)

function style(feature) {
  return {
      fillColor: getColor(feature.yColumn),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  layer.bringToFront();
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

export function leafletMap(div){

  const map = L.map(div)
    .setView([61.4591, 24.8236], 9);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  })
    .addTo(map);

  //L.geoJson(kangasalaTilasto).addTo(map);  
  L.geoJson(mergeAB, {style: style}).addTo(map);
  
  // L.marker([61.4624, 24.0913])
  //   .addTo(map)
  //   .bindPopup("A nice popup<br> indicating a point of interest.")
  //   .openPopup();
   
  return div
}

