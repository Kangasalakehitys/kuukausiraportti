//node /Users/kanga/Documents/Observable/testi/src/data/stat/yritykset/aly_pxt_11yq.json.js
import {KUNTA_ID} from "../../../variables/variables.js";
import {utcFormat} from "d3-time-format";

const URL = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/aly/statfin_aly_pxt_11yq.px"
const kunta_id = KUNTA_ID



const QUERY_START = '{ "query": [';
const QUERY1 = '{ "code": "Alue", "selection": { "filter": "item", "values": ["KU'+ kunta_id +'"] } },';
const QUERY2 = '{ "code": "Toimiala", "selection": { "filter": "item", "values": ["SSS","A","A01","A02","A03","B","B05","B06","B07","B08","B09","C","C10","C11","C12","C13","C14","C15","C16","C17","C18","C19","C20","C21","C22","C23","C24","C25","C26","C27","C28","C29","C30","C31","C32","C33","D","D35","E","E36","E37","E38","E39","F","F41","F42","F43","G","G45","G46","G47","H","H49","H50","H51","H52","H53","I","I55","I56","J","J58","J59","J60","J61","J62","J63","K","K64","K65","K66","L","L68","M","M69","M70","M71","M72","M73","M74","M75","N","N77","N78","N79","N80","N81","N82","O","O84","P","P85","Q","Q86","Q87","Q88","R","R90","R91","R92","R93","S","S94","S95","S96","T","T97","T98","U","U99","X"] } },';
// const QUERY3 = '{ "code": "Sukupuoli", "selection": { "filter": "item", "values": [ "SSS" ] } },';
// const QUERY4 = '{ "code": "Ikä", "selection": { "filter": "item", "values": [ "SSS" ] } },';
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
    //aika
    xColumn_1: f.key[0],
    //Kunta
    xColumn_2: f.key[1],
    //Toimiala
    xColumn_3: f.key[2],
    //TIedot
    xColumn_4: f.key[3],
    xColumn_5: f.key[4],
    yColumn_1: f.values[0],
    yColumn_2: f.values[1],
    yColumn_3: f.values[2],
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
