//node /Users/kanga/Documents/Observable/testi/src/data/stat/tyossakaynti/tyokay_115b.json.js
import {KUNTA_ID} from "../../../variables/variables.js";
import {utcFormat} from "d3-time-format";

const URL = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/tyokay/statfin_tyokay_pxt_115b.px"
const kunta_id = KUNTA_ID


const QUERY_START = '{ "query": [';
const QUERY1 = '{ "code": "Alue", "selection": { "filter": "item", "values": ["KU'+ kunta_id +'"] } },';
const QUERY2 = '{ "code": "Pääasiallinen toiminta", "selection": { "filter": "item", "values": ["SSS","11+12","11","12","21-99","21","22","25","24+29","99"] } },';
const QUERY3 = '{ "code": "Sukupuoli", "selection": { "filter": "item", "values": [ "SSS" ] } },';
const QUERY4 = '{ "code": "Ikä", "selection": { "filter": "item", "values": [ "SSS" ] } },';
const QUERY_STOP = '], "response": { "format": "json" } }';



const QUERY = `${QUERY_START}${QUERY1}${QUERY2}${QUERY3}${QUERY4}${QUERY_STOP}`;

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
    xColumn_1: f.key[0],
    xColumn_2: f.key[1],
    xColumn_3: f.key[2],
    xColumn_4: f.key[3],
    xColumn_5: formatTime(new Date(f.key[4])),
    yColumn_1: f.values[0],
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
