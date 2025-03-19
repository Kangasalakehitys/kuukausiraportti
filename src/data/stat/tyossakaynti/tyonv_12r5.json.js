//node /Users/kanga/Documents/Observable/testi/src/data/stat/tyossakaynti/tyonv_12r5.json.js

import {KUNTA_ID} from "../../../variables/variables.js";
import {utcFormat} from "d3-time-format";

const URL = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/tyonv/statfin_tyonv_pxt_12r5.px"
const kunta_id = KUNTA_ID


const QUERY_START = '{ "query": [';
const QUERY1 = '{ "code": "Alue", "selection": { "filter": "item", "values": ["KU'+ kunta_id +'"] } },';
// const QUERY2 = '{ "code": "Ammattiryhmä", "selection": { "filter": "item", "values": ["SSS"] } },';
// const QUERY3 = '{ "code": "Sukupuoli", "selection": { "filter": "item", "values": [ "SSS" ] } },';
// const QUERY4 = '{ "code": "Ikä", "selection": { "filter": "item", "values": [ "SSS" ] } },';
const QUERY_STOP = '], "response": { "format": "json" } }';

// 0	"Työnhakijoita laskentapäivänä (lkm.)"
// 1	"Työttömät työnhakijat laskentapäivänä (lkm.)"
// 2	"TK:n Työssäkäyntitilaston työvoima (lkm.)"
// 3	"Työttömien työnhakijoiden %-osuus työvoimasta (%)"
// 4	"Työttömät työnhakijat, miehet (lkm.)"
// 5	"Työttömät työnhakijat, naiset (lkm.)"
// 6	"Alle 20-v. työttömät työnhakijat (lkm.)"
// 7	"Alle 25-v. työttömät työnhakijat (lkm.)"
// 8	"Yli 50-v. työttömät työnhakijat (lkm.)"
// 9	"Vamm./pitkäaik.sair. työttömät työnhakijat (lkm.)"
// 10	"Ulkomaalaisia työttömiä työnhakijoita laskentapäivänä (lkm.)"
// 11	"Pitkäaikaistyöttömät (lkm.)"
// 12	"Kassan jäseniä työttömistä työnhakijoista laskentapäivänä (lkm.)"
// 13	"Kokoaikaisesti lomautetut laskentapäivänä (lkm.)"
// 14	"Lyhennetyllä työviikolla laskentapäivänä (lkm.)"
// 15	"Työllistettynä olevat laskentapäivänä (lkm.)"
// 16	"Työharj./työelämävalmennuksessa olevat laskentapäivänä (lkm.)"
// 17	"Työ- ja koulutuskokeilussa olevat laskentapäivänä (lkm.)"
// 18	"Työvoimakoulutuksessa olevat laskentapäivänä (lkm.)"
// 19	"Valmennuksessa olevat laskentapäivänä (lkm.)"
// 20	"Muissa palveluissa olevat laskentapäivänä (lkm.)"
// 21	"Avoimet työpaikat kuukauden laskentapäivänä (lkm.)"
// 22	"Uudet avoimet työpaikat kuukauden aikana (lkm.)"

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
    xColumn_1: f.key[0],
    xColumn_2: f.key[1],
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
    yColumn_20: f.values[20],
    yColumn_21: f.values[21],
    yColumn_22: f.values[22]
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
