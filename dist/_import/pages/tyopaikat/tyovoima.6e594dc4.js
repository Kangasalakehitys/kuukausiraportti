import {FileAttachment} from "../../../_observablehq/stdlib.63717d9f.js";
import {utcFormat} from "../../../_node/d3-time-format@4.1.0/index.4b8e4965.js";

//Timeformat
const formatYear4 = utcFormat("%Y");

// //Data
export const tyokay_115b = (await FileAttachment({"name":"../../../data/stat/tyossakaynti/tyokay_115b.json","mimeType":"application/json","path":"../../../_file/data/stat/tyossakaynti/tyokay_115b.7b88798d.json","lastModified":1739452228627,"size":111783}, import.meta.url)
            .json())
                .map(d => ({
                    ...d,
                    xColumn_1: d.data.xColumn_2, 
                    xColumn: new Date(d.data.xColumn_5),
                    yColumn: +d.data.yColumn_1,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))

                //Filters
export const all_tyokay_115b = tyokay_115b.filter(function (suodatus) {
  if (suodatus.xColumn_1 == "SSS") return  suodatus.xColumn_1 = "Yhteensä"
});               

export const part_1_tyokay_115b = tyokay_115b.filter(function (suodatus) {

  if (
    suodatus.xColumn_1 == "11+12" || 
    suodatus.xColumn_1 == "11" || 
    suodatus.xColumn_1 == "12"
    )
   return  suodatus.xColumn_1

});

//Change all names
export const part_3_tyokay_115b = tyokay_115b.filter(function (suodatus) {

  return suodatus.xColumn_1 == "11+12" ? suodatus.xColumn_1 = "Työvoima"
    : suodatus.xColumn_1 == "11" ? suodatus.xColumn_1 = "Työlliset"
    : suodatus.xColumn_1 == "12" ? suodatus.xColumn_1 = "Työttömät"
    : suodatus.xColumn_1 == "21-99" ? suodatus.xColumn_1 = "Työvoiman ulkopuolella olevat"
    : suodatus.xColumn_1 == "21" ? suodatus.xColumn_1 = "0-14-vuotiaat"
    : suodatus.xColumn_1 == "22" ? suodatus.xColumn_1 = "Opiskelijat"
    : suodatus.xColumn_1 == "25" ? suodatus.xColumn_1 = "Varusmiehet (siviilipalv.)"
    : suodatus.xColumn_1 == "24+29" ? suodatus.xColumn_1 = "Eläkeläiset"
    : suodatus.xColumn_1 == "99" ? suodatus.xColumn_1 = "Muut työvoiman ulkopuolella"
    : suodatus.xColumn_1

});

export const tbl_part_1_tyokay_115b = part_1_tyokay_115b
  .map((d) => ({
    "Vuosi": formatYear4(d.xColumn),
    "Pääasiallinen toiminta": d.xColumn_1,
    "Lkm": d.yColumn
  }));