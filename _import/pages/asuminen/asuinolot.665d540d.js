import {FileAttachment} from "../../../_observablehq/stdlib.63717d9f.js";
import {utcFormat} from "../../../_node/d3-time-format@4.1.0/index.4b8e4965.js";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data all
export const asas_116e = (await FileAttachment({"name":"../../../data/stat/asuminen/asas_116e.json","mimeType":"application/json","path":"../../../_file/data/stat/asuminen/asas_116e.4c386f5d.json","lastModified":1739790187566,"size":207174}, import.meta.url)
            .json())
                .map(d => ({
                    ...d, 
                    xColumn_3: d.data.xColumn,
                    xColumn_1: d.data.xColumn_1,
                    xColumn: new Date(d.data.xColumn_2),
                    xColumn_2: d.data.xColumn_3,
                    yColumn: +d.data.yColumn,
                    yColumn_1: +d.data.yColumn_1,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))


//Change hallintaperuste
export const names_asas_116e = asas_116e.filter(function (suodatus) {
return suodatus.xColumn_1 == "SSS" ? suodatus.xColumn_1 = "Yhteensä"
  : suodatus.xColumn_1 == "1-2" ? suodatus.xColumn_1 = "Kaikki omistusasunnot"
  : suodatus.xColumn_1 == "3-5" ? suodatus.xColumn_1 = "Kaikki vuokra-asunnot"
  : suodatus.xColumn_1 == "3-4" ? suodatus.xColumn_1 = "Arava tai korkotukivuokra-asunto"
  : suodatus.xColumn_1 == "5" ? suodatus.xColumn_1 = "Muu vuokra-asunto"
  : suodatus.xColumn_1 == "6" ? suodatus.xColumn_1 = "Asumisoikeusasunnot"
  : suodatus.xColumn_1 == "7-9" ? suodatus.xColumn_1 = "Muu tai tuntematon hallintaperuste"
: suodatus.xColumn_1
});

//Change asuntokunnan koko
export const names_asas_116e_2 = asas_116e.filter(function (suodatus) {
  return suodatus.xColumn_2 == "SSS" ? suodatus.xColumn_2 = "Kaikki asuntokunnat"
  : suodatus.xColumn_2
  });

  //Change hallintaperuste
export const asas_116e_hallinta = names_asas_116e.filter(function (suodatus) {

    if (((suodatus.xColumn_1 === "Kaikki omistusasunnot" || suodatus.xColumn_1 === "Kaikki vuokra-asunnot")) && (suodatus.xColumn_2 === "Kaikki asuntokunnat")) {
      return  suodatus.xColumn_1
    }


  });
  


//Table
export const asas_116e_tbl = asas_116e
  .map((d) => ({
    "Vuosi": formatYear4(new Date(d.xColumn)),
    "Hallintaperuste": d.xColumn_1,
    "Asuntokunnan koko": d.xColumn_2,
    "Asuntokuntia": +d.yColumn,
    "Asuntoväestön lkm": +d.yColumn_1
  }))

