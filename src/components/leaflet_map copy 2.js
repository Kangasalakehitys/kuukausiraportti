//Data import
import {kangasalaBorders} from "../data/maps/kangasala_geojson.js";
import {kangasalaTilasto} from "../data/maps/kangasala-tilasto_geojson.js";
import {mergeAB} from "../pages/vaesto/vaesto_osa.js";





export function leafletMap(div){

  const map = L.map(div)
    .setView([61.4591, 24.8236], 9);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  })
    .addTo(map);


  //Colors
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
//Styles
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
 
/* global statesData */
const geojson = L.geoJson(mergeAB, {
  style,
  onEachFeature
}).addTo(map);



function resetHighlight(e) {
  geojson.resetStyle(e.target);
  //info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  }).bindPopup(
    '<div><h4>' + feature.properties.nimi + '</h4>' + feature.yColumn + ' väestö</div>' );
}



map.attributionControl.addAttribution('Väestötieto &copy; <a href="https://stat.fi/fi/">Tilastokeskus</a>');


const legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  const div = L.DomUtil.create('div', 'info legend');
  const grades = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000];
  const labels = [];
  let from, to;


  for (let i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(map);
  

return div
}

