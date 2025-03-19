//node /Users/kanga/Documents/Observable/testi/src/data/stat/vaesto/vaerak_pxt_11re.json.js
import {
  KUNTA_ID, 
  OSA_ALUEET,
  IKA_KAIKKI,
  IKA_16LK,
  KUNNAT_KAIKKI_1,
  KUNNAT_KAIKKI_2,
} from "../../../variables/variables.js";
import {utcFormat} from "d3-time-format";

const URL = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11re.px"
const kunta_id = KUNTA_ID

const SSS = '"SSS",'

const QUERY_START = '{ "query": [';
const QUERY1 = '{ "code": "Alue", "selection": { "filter": "item", "values": ['+ KUNNAT_KAIKKI_1 + KUNNAT_KAIKKI_2 +'] } },';
const QUERY2 = '{ "code": "Sukupuoli", "selection": { "filter": "item", "values": ["SSS"] } },';
const QUERY3 = '{ "code": "Ikä", "selection": { "filter": "item", "values": ["SSS"] } },';
// const QUERY4 = '{ "code": "Ikä", "selection": { "filter": "item", "values": [ "SSS" ] } },';
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
    yColumn: f.values[0]
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
