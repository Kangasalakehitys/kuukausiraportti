//node /Users/kanga/Documents/Observable/testi/src/data/stat/ennakkotiedot/hopea_vamuu_pxt_119e.json.js

import {
  KUNTA_ID, 
  OSA_ALUEET,
  IKA_KAIKKI,
  IKA_16LK,
  KUNNAT_KAIKKI_1,
  KUNNAT_KAIKKI_2,
} from "../../../variables/variables.js";
import {utcFormat} from "d3-time-format";



const URL = "https://pxhopea2.stat.fi:443/PXWeb/api/v1/fi/Kuntien_ennakkotiedot/Kuntien_ennakkotiedot_2025/vaesto_kuukausi_vamuu_pxt_119e.px"
const kunta_id = KUNTA_ID



const QUERY_START = '{ "query": [';
const QUERY1 = '{ "code": "Alue", "selection": { "filter": "item", "values": [' + KUNNAT_KAIKKI_1 + KUNNAT_KAIKKI_2 +'] } },';
const QUERY2 = '{ "code": "Tiedot", "selection": { "filter": "item", "values": ["vm01","vm11","luonvalisays","vm43_tulo","vm43_lahto","vm43_netto","vm44","vm41","vm41_nordic","vm41_eu","vm42","vm42_nordic","vm42_eu","vm4142","koknetmuutto","vm2126","vm3136","valisays","vakorjaus","kokmuutos","vaesto"] } },';
// const QUERY4 = '{ "code": "Kieli", "selection": { "filter": "item", "values": ["SSS"] } },';
// const QUERY5 = '{ "code": "Vuosi", "selection": { "filter": "item", "values": ["2023"] } },';
const QUERY_STOP = '], "response": { "format": "json" } }';

const QUERY = `${QUERY_START}${QUERY1}${QUERY2}${QUERY_STOP}`;

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
    xColumn: f.key[0],
    xColumn_1: f.key[1],
    yColumn: f.values[0],
    yColumn_1: f.values[1],
    yColumn_2: f.values[2],
    yColumn_3: f.values[3],
    yColumn_4: f.values[4],
    yColumn_5: f.values[5],
    yColumn_6: f.values[6],
    yColumn_7: f.values[7],
    yColumn_8: f.values[8],
    yColumn_9: f.values[9],
    yColumn_10: f.values[10],
    yColumn_11: f.values[11],
    yColumn_12: f.values[12],
    yColumn_13: f.values[13],
    yColumn_14: f.values[14],
    yColumn_15: f.values[15],
    yColumn_16: f.values[16],
    yColumn_17: f.values[17],
    yColumn_18: f.values[18],
    yColumn_19: f.values[19],
    yColumn_20: f.values[20]
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
