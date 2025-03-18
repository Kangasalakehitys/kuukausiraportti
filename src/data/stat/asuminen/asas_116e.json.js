//node /Users/kanga/Documents/Observable/testi/src/data/stat/asuminen/asas_116e.json.js
import {KUNTA_ID} from "../../../variables/variables.js";
import {utcFormat} from "d3-time-format";

const URL = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/asas/statfin_asas_pxt_116e.px"
const kunta_id = KUNTA_ID



const QUERY1 = '{ "code": "Alue", "selection": { "filter": "item", "values": ["KU'+ kunta_id +'"] } },';
const QUERY2 = '{ "code": "Hallintaperuste", "selection": { "filter": "item", "values": [ "SSS","1-2","3-5","3-4","5","6","7-9" ] } },';
const QUERY3 = '{ "code": "Asuntokunnan koko", "selection": { "filter": "item", "values": [ "SSS","1","2","3","4" ] } },';
// const QUERY4 = '{ "code": "Asunnon käytössäolo", "selection": { "filter": "item", "values": [ "SSS" ] } },';
const QUERY_START = '{ "query": [';
const QUERY_STOP = '], "response": { "format": "json" } }';

const QUERY = `${QUERY_START}${QUERY1}${QUERY2}${QUERY3}${QUERY_STOP}`;

const formatTime = utcFormat("%Y");

const responseData = await fetch(URL, {
  body: QUERY,
  headers: {
    "content-type": "application/json",
    "accept": "application/json",
  },
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
    xColumn_2: f.key[2],
    xColumn_3: f.key[3],
    yColumn: +f.values[0],
    yColumn_1: +f.values[1]
    })
  )
)
.catch(error => {
  console.warn(error);
});

const responseMeta = await fetch(URL, {
  body: QUERY,
  headers: {
    "content-type": "application/json",
    "accept": "application/json",
  },
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

