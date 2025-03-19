import {FileAttachment} from "observablehq:stdlib";
import {utcFormat} from "d3-time-format";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data all
export const ashi_13mx = (await FileAttachment("../../data/stat/asuminen/ashi_13mx.json")
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