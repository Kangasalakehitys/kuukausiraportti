import {FileAttachment} from "../../../_observablehq/stdlib.63717d9f.js";
import {utcFormat} from "../../../_node/d3-time-format@4.1.0/index.4b8e4965.js";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data all
export const asas_116f = (await FileAttachment({"name":"../../../data/stat/asuminen/asas_116f.json","mimeType":"application/json","path":"../../../_file/data/stat/asuminen/asas_116f.89c5692e.json","lastModified":1739692367306,"size":16173}, import.meta.url)
            .json())
                .map(d => ({
                    ...d, 
                    xColumn_4: new Date(d.data.xColumn),
                    //Talotyypit
                    xColumn_1: d.data.xColumn_1,
                    //Rakennusvuosi
                    xColumn: d.data.xColumn_2,
                    xColumn_3: d.data.xColumn_3,
                    //Arvo
                    yColumn_1: +d.data.yColumn_1,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))


//Change names
export const names_asas_116f_1 = asas_116f.filter(function (suodatus) {
return suodatus.xColumn_1 == "1" ? suodatus.xColumn_1 = "Omakoti- ja paritalot"
  : suodatus.xColumn_1 == "2" ? suodatus.xColumn_1 = "Rivitalot"
  : suodatus.xColumn_1 == "3" ? suodatus.xColumn_1 = "Kerrostalot"
  : suodatus.xColumn_1 == "4" ? suodatus.xColumn_1 = "Muut rakennukset"
  : suodatus.xColumn_1 == "SSS" ? suodatus.xColumn_1 = "Yhteensä"
: suodatus.xColumn_1
});

export const names_asas_116f_2 = names_asas_116f_1.filter(function (suodatus) {
  return suodatus.xColumn == "SSS" ? suodatus.xColumn = "Yhteensä"
  : suodatus.xColumn
  });


//Filters only SSS
export const all_asas_116f = names_asas_116f_2.filter(function (suodatus) {
    // if (suodatus.xColumn_1 == "SSS" && suodatus.xColumn_2 == "SSS")
    // return  suodatus.xColumn_1
    return suodatus.xColumn_1 === 'Yhteensä' && suodatus.xColumn_2 != 'Yhteensä'
});

//Filters SSS away
export const part_1_asas_116f = names_asas_116f_2.filter(function (suodatus) {

  return (suodatus.xColumn != 'Yhteensä' && suodatus.xColumn_1 != 'Yhteensä')

});



//Table
export const asas_116f_tbl = asas_116f
  .map((d) => ({
    "Talotyyppi": d.xColumn_1,
    "Rakennusvuosi": d.xColumn,
    "Yhteensä": +d.yColumn_1
  }))