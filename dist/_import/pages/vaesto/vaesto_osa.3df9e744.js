import {FileAttachment} from "../../../_observablehq/stdlib.63717d9f.js";
import {utcFormat, utcParse} from "../../../_node/d3-time-format@4.1.0/index.4b8e4965.js";
import {kangasalaTilasto} from "../../data/maps/kangasala-tilasto_geojson.0e1a4c4e.js";

//"xColumn_1":"211999999","xColumn_2":"100","xColumn_3":"2023","yColumn_1":"1"

//Timeformat
const formatYear4 = utcFormat("%Y");
const parseYear4 = utcParse("%Y-%m-%d");

//Data
export const hopea_varak_12hk = (await FileAttachment({"name":"../../../data/stat/vaesto/hopea_varak_12hk.json","mimeType":"application/json","path":"../../../_file/data/stat/vaesto/hopea_varak_12hk.20314d38.json","lastModified":1740036621093,"size":11746798}, import.meta.url)
            .json())
                .map(d => ({
                    ...d, 
                    //Alue
                    xColumn_1: d.data.xColumn_1,
                    //Vuosi
                    //xColumn: new Date(d.data.xColumn_3),
                    xColumn: d.data.xColumn_3,
                    //Ikä
                    xColumn_2: +d.data.xColumn_2.replace("-","").replace("SSS","200"),
                    yColumn: +d.data.yColumn_1,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))

//Data tilastoalueet yhteensä
export const hopea_varak_12hk_tilasto = (await FileAttachment({"name":"../../../data/stat/vaesto/hopea_varak_12hk.json","mimeType":"application/json","path":"../../../_file/data/stat/vaesto/hopea_varak_12hk.20314d38.json","lastModified":1740036621093,"size":11746798}, import.meta.url)
.json())
    .map(d => ({
        ...d, 
        //Alue
        xColumn_1: d.data.xColumn_1,
        //Vuosi
        xColumn: d.data.xColumn_3,
        //Ikä
        xColumn_2: +d.data.xColumn_2.replace("-","").replace("SSS","200"),
        yColumn: +d.data.yColumn_1,
        updated: d.meta.updated,
        label: d.meta.label,
        source: d.meta.source
    })).filter(function (suodatus) {
      return (
        suodatus.xColumn_1 === '211101' || 
        suodatus.xColumn_1 === '211102'|| 
        suodatus.xColumn_1 === '211103' ||
        suodatus.xColumn_1 === '211104'||
        suodatus.xColumn_1 === '211105'||
        suodatus.xColumn_1 === '211106'||
        suodatus.xColumn_1 === '211201'||
        suodatus.xColumn_1 === '211202'
      )
    }).filter(function (suodatus) {
      return (
        suodatus.xColumn_2 === 200
      )
    })
    .filter(function (suodatus) {
      return (
        suodatus.xColumn === "2023"
      )
    })


//Table
export const hopea_varak_12hk_tbl = hopea_varak_12hk
  .map((d) => ({
    "Vuosi": formatYear4(d.xColumn),
    "Alue": d.xColumn_1,
    "Ikä": d.xColumn_2,
    "Väestö": d.yColumn
  }));

//features.properties.tilastoalu
export const arrayA =  kangasalaTilasto.features;
//xColumn_1
export const arrayB =  hopea_varak_12hk_tilasto;


export const vaesto_Tilastoalueet = arrayA.map( idA => {
  const matched = arrayB.find(idB => idB.xColumn_1 === idA.properties.tilastoalu)
  if(matched) {
    return {
      ...idA, 
      ...matched
    }
  } else {
    // return companyA element or customize it with your case
  }
}
)


// export const mergeAB = arrayA.map( companyA => {
//   const matched = arrayB.find(companyB => companyB.xColumn_1 === companyA.properties.tilastoalu)
//   if(matched) {
//     return {...companyA, ...matched}
//   } else {
//     // return companyA element or customize it with your case
//   }
// }
// )


