//node /Users/kanga/Documents/Observable/testi/src/data/stat/asuminen/ashi_13mx.json.js
import {KUNTA_ID} from "../../../variables/variables.js";
import {utcFormat} from "d3-time-format";

const URL = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/ashi/statfin_ashi_pxt_13mx.px"
const kunta_id = KUNTA_ID



const QUERY1 = '{ "code": "Kunta", "selection": { "filter": "item", "values": ["'+ kunta_id +'"] } },';
const QUERY2 = '{ "code": "Talotyyppi", "selection": { "filter": "item", "values": [ "0","1","3" ] } },';
// const QUERY3 = '{ "code": "Rakennusvuosi", "selection": { "filter": "item", "values": [ "SSS","1754 - 1920","1921 - 1939","1940 - 1959","1960 - 1969","1970 - 1979","1980 - 1989","1990 - 1999","2000 - 2009","2010 - 2019","2020" ] } },';
// const QUERY4 = '{ "code": "Asunnon käytössäolo", "selection": { "filter": "item", "values": [ "SSS" ] } },';
const QUERY_START = '{ "query": [';
const QUERY_STOP = '], "response": { "format": "json" } }';

const QUERY = `${QUERY_START}${QUERY1}${QUERY2}${QUERY_STOP}`;

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
    xColumn: formatTime(new Date(f.key[0])),
    xColumn_1: f.key[1],
    xColumn_2: f.key[2],
    yColumn_1: +f.values[0]
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

