import {FileAttachment} from "observablehq:stdlib";
import {utcFormat} from "d3-time-format";

//Timeformat
const formatYear4 = utcFormat("%Y");


//Data
export const vaenn_14wx = (await FileAttachment("../../data/stat/vaesto/vaenn_14wx.json")
            .json())
                .map(d => ({
                    ...d, 
                    xColumn_4: d.data.xColumn_1,
                    //Vuosi
                    xColumn: d.data.xColumn_2,
                    //Sukupuoli
                    xColumn_1: d.data.xColumn_3,
                    //Ikä
                    xColumn_2: +d.data.xColumn_4.replace("-",""),
                    //Arvo
                    yColumn: +d.data.yColumn_1,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))


export const all_vaenn_14wx = vaenn_14wx
    .filter(function (suodatus) {
  return suodatus.xColumn_1 == "1" ? suodatus.xColumn_1 = "Miehet"
  : suodatus.xColumn_1 == "2" ? suodatus.xColumn_1 = "Naiset"
  : suodatus.xColumn_1
  })
    .filter(function (suodatus) {
    return (suodatus.xColumn === '2024' || suodatus.xColumn === '2035'|| suodatus.xColumn === '2045')
  })




//Table
export const vaenn_14wx_tbl = vaenn_14wx
  .map((d) => ({
    "Vuosi": formatYear4(d.xColumn),
    "Väestö": d.yColumn
  }));