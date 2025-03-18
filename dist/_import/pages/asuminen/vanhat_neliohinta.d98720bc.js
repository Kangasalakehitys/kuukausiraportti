import {FileAttachment} from "../../../_observablehq/stdlib.63717d9f.js";
import {utcFormat} from "../../../_node/d3-time-format@4.1.0/index.4b8e4965.js";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data all
export const ashi_13mx = (await FileAttachment({"name":"../../../data/stat/asuminen/ashi_13mx.json","mimeType":"application/json","path":"../../../_file/data/stat/asuminen/ashi_13mx.4ecf6f1a.json","lastModified":1739781147978,"size":16849}, import.meta.url)
            .json())
                .map(d => ({
                    ...d, 
                    //Vuosi
                    xColumn: new Date(d.data.xColumn),
                    xColumn_2: d.data.xColumn_1,
                    //Talotyypit
                    xColumn_1: d.data.xColumn_2,
                    yColumn: +d.data.yColumn_1,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))


//Change names
export const names_ashi_13mx = ashi_13mx.filter(function (suodatus) {
return suodatus.xColumn_1 == "0" ? suodatus.xColumn_1 = "Talotyypit yhteensä"
  : suodatus.xColumn_1 == "1" ? suodatus.xColumn_1 = "Rivitalot"
  : suodatus.xColumn_1 == "3" ? suodatus.xColumn_1 = "Kerrostalot"
: suodatus.xColumn_1
});

//Table
export const ashi_13mx_tbl = ashi_13mx
  .map((d) => ({
    "Vuosi": formatYear4(new Date(d.xColumn)),
    "Talotyyppi": d.xColumn_1,
    "Keskiarvo": +d.yColumn
  }))