//node /Users/kanga/Documents/Observable/testi/src/data/stat/muuttoliike/hopea_muvamuu_12pn.json.js

import {
  KUNTA_ID, 
  OSA_ALUEET,
  IKA_KAIKKI,
  IKA_16LK,
  KUNNAT_KAIKKI_1,
  KUNNAT_KAIKKI_2,
} from "../../../variables/variables.js";
import {utcFormat} from "d3-time-format";



const URL = "https://pxhopea2.stat.fi:443/PXWeb/api/v1/fi/Muuttoliike_ja_vaestonmuutokset/Muuttoliike_ja_vaestonmuutokset_aikasarja/Muuttoliike/muvamuu_12pn.px"
const kunta_id = KUNTA_ID



const QUERY_START = '{ "query": [';
//const QUERY1 = '{ "code": "Tuloalue", "selection": { "filter": "item", "values": ["KU'+ kunta_id +'"] } },';
const QUERY1 = '{ "code": "Tuloalue", "selection": { "filter": "item", "values": [' + KUNNAT_KAIKKI_1 + KUNNAT_KAIKKI_2 +'] } },';
const QUERY2 = '{ "code": "Lähtöalue", "selection": { "filter": "item", "values": [' + KUNNAT_KAIKKI_1 + KUNNAT_KAIKKI_2 + '] } },';
const QUERY3 = '{ "code": "Ikä", "selection": { "filter": "item", "values": ["SSS"] } },';
const QUERY4 = '{ "code": "Kieli", "selection": { "filter": "item", "values": ["SSS"] } },';
const QUERY5 = '{ "code": "Vuosi", "selection": { "filter": "item", "values": ["2023"] } },';
const QUERY_STOP = '], "response": { "format": "json" } }';



const QUERY = `${QUERY_START}${QUERY1}${QUERY2}${QUERY3}${QUERY4}${QUERY5}${QUERY_STOP}`;

const formatTime = utcFormat("%Y");

const myHeaders = new Headers();
myHeaders.append("un", "V2144");
myHeaders.append("pw", "3682");
myHeaders.append("Content-Type", "application/json");

const responseData = await fetch(URL, {
  body: QUERY,
  headers: myHeaders,
  method: "POST",
  mode: "cors"
})
.then(responseData => {
    return responseData.json();
    
})
.then(responseData =>
  responseData.data.map(f => ({
    xColumn_1: f.key[0],
    xColumn_2: f.key[1],
    xColumn_3: f.key[2],
    xColumn_4: f.key[3],
    yColumn: f.values[0]
    })
  )
)
.catch(error => {
  console.warn(error);
});


 
const responseMeta = await fetch(URL, {
  body: QUERY,
  headers: myHeaders,
  method: "POST",
  mode: "cors"
})
.then(responseMeta => {
    return responseMeta.json();
    
})
.then(responseMeta =>
  responseMeta.metadata.map(f => ({
      updated: f.updated,
      label: f.label,
      source: f.source
    })
  )
)
.catch(error => {
  console.warn(error);
});
  
  //Log must be console.warn if console.log JSON dont work
  console.warn("responseData", responseData)


const data = responseData; 
const meta = responseMeta; 
const mapArrays = (data, meta) => { 
   const res = []; 
   for(let i = 0; i < data.length; i++){ 
      res.push({ 
         data: data[i], 
         meta: meta[0] 
      }); 
   }; 
   return res; 
}; 
console.warn(mapArrays(data, meta)); 

const combineData = mapArrays(data, meta);


//Output
//process.stdout.write(JSON.stringify(responseData));

process.stdout.write(JSON.stringify(combineData));






