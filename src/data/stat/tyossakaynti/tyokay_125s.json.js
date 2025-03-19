//node /Users/kanga/Documents/Observable/testi/src/data/stat/tyossakaynti/tyokay_125s.json.js
import {KUNTA_ID} from "../../../variables/variables.js";
import {utcFormat} from "d3-time-format";

const URL = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/tyokay/statfin_tyokay_pxt_125s.px"
const kunta_id = KUNTA_ID



const QUERY1 = '{ "code": "Alue", "selection": { "filter": "item", "values": ["KU'+ kunta_id +'"] } },';
//const QUERY2 = '{ "code": "Toimiala", "selection": { "filter": "item", "values": [ "SSS","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U"] } },';
//const QUERY2 = '{ "code": "Toimiala", "selection": { "filter": "item", "values": [ "SSS"] } },';
//const QUERY3 = '{ "code": "Sukupuoli", "selection": { "filter": "item", "values": [ "SSS" ] } },';
//const QUERY4 = '{ "code": "Vuosi", "selection": { "filter": "item", "values": [ "2019","2020","2021" ] } },';
const QUERY_START = '{ "query": [';
const QUERY_STOP = '], "response": { "format": "json" } }';



//const QUERY = `${QUERY_START}${QUERY1}${QUERY2}${QUERY3}${QUERY_STOP}`;

const QUERY = `${QUERY_START}${QUERY1}${QUERY_STOP}`;

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
    xColumn_1: f.key[1],
    xColumn_2: formatTime(new Date(f.key[0])),
    yColumn_1: f.values[0]
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

