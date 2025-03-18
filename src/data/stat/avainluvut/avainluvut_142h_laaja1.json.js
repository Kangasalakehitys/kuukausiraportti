//node /Users/kanga/Documents/Observable/testi/src/data/stat/avainluvut/avainluvut_142h_laaja1.json.js
import {KUNTA_ID} from "../../../variables/variables.js";
import {utcFormat} from "d3-time-format";

const URL = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/Kuntien_avainluvut/uusin/142h.px"
const kunta_id = KUNTA_ID



const QUERY1 = '{ "code": "Alue", "selection": { "filter": "item", "values": ["KU'+ kunta_id +'"] } },';
const QUERY2 = '{ "code": "Tiedot", "selection": { "filter": "item", "values": ["M411","M316","M476","M469","M471","M393","M392","M390","M391","M422","M421","M479","M478","M397","M410","M306","M300","M304","M522","M272","M265","M523","M267","M274","M297"] } },';
//const QUERY3 = '{ "code": "Ikä", "selection": { "filter": "item", "values": [ "SSS" ] } },';
//const QUERY4 = '{ "code": "Vuosi", "selection": { "filter": "item", "values": [ "2019","2020","2021" ] } },';
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
    xColumn: formatTime(new Date(f.key[1])),
    yColumn: +f.values[0],
    yColumn_1: +f.values[1],
    yColumn_2: +f.values[2],
    yColumn_3: +f.values[3],
    yColumn_4: +f.values[4],
    yColumn_5: +f.values[5],
    yColumn_6: +f.values[6],
    yColumn_7: +f.values[7],
    yColumn_8: +f.values[8],
    yColumn_9: +f.values[9],
    yColumn_10: +f.values[10],
    yColumn_11: +f.values[11],
    yColumn_12: +f.values[12],
    yColumn_13: +f.values[13],
    yColumn_14: +f.values[14],
    yColumn_15: +f.values[15],
    yColumn_16: +f.values[16],
    yColumn_17: +f.values[17],
    yColumn_18: +f.values[18],
    yColumn_19: +f.values[19],
    yColumn_20: +f.values[20],
    yColumn_21: +f.values[21],
    yColumn_22: +f.values[22],
    yColumn_23: +f.values[23],
    yColumn_24: +f.values[24]
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

