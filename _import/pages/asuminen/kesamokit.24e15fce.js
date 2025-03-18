import {FileAttachment} from "../../../_observablehq/stdlib.63717d9f.js";
import {utcFormat} from "../../../_node/d3-time-format@4.1.0/index.4b8e4965.js";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data all
export const rakke_116j = (await FileAttachment({"name":"../../../data/stat/asuminen/rakke_116j.json","mimeType":"application/json","path":"../../../_file/data/stat/asuminen/rakke_116j.59098060.json","lastModified":1739777148467,"size":2317}, import.meta.url)
            .json())
                .map(d => ({
                    ...d, 
                    xColumn: new Date(d.data.xColumn),
                    yColumn: +d.data.yColumn,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))


// //Change names
// export const names_asas_116f_1 = asas_116f.filter(function (suodatus) {
// return suodatus.xColumn_1 == "1" ? suodatus.xColumn_1 = "Omakoti- ja paritalot"
//   : suodatus.xColumn_1 == "2" ? suodatus.xColumn_1 = "Rivitalot"
//   : suodatus.xColumn_1 == "3" ? suodatus.xColumn_1 = "Kerrostalot"
//   : suodatus.xColumn_1 == "4" ? suodatus.xColumn_1 = "Muut rakennukset"
//   : suodatus.xColumn_1 == "SSS" ? suodatus.xColumn_1 = "Yhteensä"
// : suodatus.xColumn_1
// });

// export const names_asas_116f_2 = names_asas_116f_1.filter(function (suodatus) {
//   return suodatus.xColumn_2 == "SSS" ? suodatus.xColumn_2 = "Yhteensä"
//   : suodatus.xColumn_2
//   });


// //Filters only SSS
// export const all_asas_116f = names_asas_116f_2.filter(function (suodatus) {
//     // if (suodatus.xColumn_1 == "SSS" && suodatus.xColumn_2 == "SSS")
//     // return  suodatus.xColumn_1
//     return suodatus.xColumn_1 === 'Yhteensä' && suodatus.xColumn_2 != 'Yhteensä'
// });

// //Filters SSS away
// export const part_1_asas_116f = names_asas_116f_2.filter(function (suodatus) {

//   return (suodatus.xColumn_1 != 'Yhteensä' && suodatus.xColumn_2 != 'Yhteensä')

// });



//Table
export const rakke_116j_tbl = rakke_116j
  .map((d) => ({
    "Vuosi": formatYear4(d.xColumn),
    "Yhteensä": +d.yColumn
  }))