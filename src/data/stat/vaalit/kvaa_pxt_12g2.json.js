//node /Users/kanga/Documents/Observable/testi/src/data/stat/vaalit/kvaa_pxt_12g2.json.js
import {VAALI_ID} from "../../../variables/variables.js";
import {utcFormat} from "d3-time-format";

const URL = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/kvaa/statfin_kvaa_pxt_12g2.px"


const QUERY_START = '{ "query": [';
const QUERY1 = '{ "code": "Alue", "selection": { "filter": "item", "values": ["'+ VAALI_ID +'"] } },';
//const QUERY2 = '{ "code": "Sukupuoli", "selection": { "filter": "item", "values": ["1","2"] } },';
//const QUERY3 = '{ "code": "Ikä", "selection": { "filter": "item", "values": ["000", "001", "002", "003", "004", "005", "006", "007", "008", "009", "010", "011", "012", "013", "014", "015", "016", "017", "018", "019", "020", "021", "022", "023", "024", "025", "026", "027", "028", "029", "030", "031", "032", "033", "034", "035", "036", "037", "038", "039", "040", "041", "042", "043", "044", "045", "046", "047", "048", "049", "050", "051", "052", "053", "054", "055", "056", "057", "058", "059", "060", "061", "062", "063", "064", "065", "066", "067", "068", "069", "070", "071", "072", "073", "074", "075", "076", "077", "078", "079", "080", "081", "082", "083", "084", "085", "086", "087", "088", "089", "090", "091", "092", "093", "094", "095", "096", "097", "098", "099", "100-"] } },';
// const QUERY4 = '{ "code": "Ikä", "selection": { "filter": "item", "values": [ "SSS" ] } },';
const QUERY_STOP = '], "response": { "format": "json" } }';



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
    xColumn: f.key[0],
    xColumn_1: f.key[1],
    yColumn: f.values[0],
    yColumn_1: f.values[1],
    yColumn_2: f.values[2],
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
