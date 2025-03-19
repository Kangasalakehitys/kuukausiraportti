import {FileAttachment} from "observablehq:stdlib";
import {utcFormat} from "d3-time-format";

//Timeformat
const formatYear4 = utcFormat("%Y");
//        xColumn: parseTime_RE(data.key[DATA_X_RE].replace("M","-")),
// //Data
export const tyonv_12ti = (await FileAttachment("../../data/stat/tyossakaynti/tyonv_12ti.json")
            .json())
                .map(d => ({
                    ...d,
                    xColumn_1: d.data.xColumn_1,
                    xColumn_2: d.data.xColumn_2,
                    xColumn: new Date(d.data.xColumn_3.replace("M","-")),
                    yColumn: +d.data.yColumn,
                    yColumn_1: +d.data.yColumn_1,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))

export const all_tyonv_12ti = tyonv_12ti.filter(function (suodatus) {
  return suodatus.xColumn_2 == "SSS" ? suodatus.xColumn_2 = "Yhteensä"
  : suodatus.xColumn_2
  });

export const flat_tyonv_12ti = tyonv_12ti
  .flatMap(({xColumn, ...categories}) => Object.entries(categories)
    .map(([xColumn_1, yColumn]) => ({
      xColumn, 
      xColumn_1, 
      yColumn
    }))
    .filter(function (suodatus) {
    return (suodatus.xColumn_1 === 'yColumn' || suodatus.xColumn_1 === 'yColumn_1')
    })
    .filter(function (suodatus) {
      return suodatus.xColumn_1 === "yColumn" ? suodatus.xColumn_1 = "Työttömät" 
      : suodatus.xColumn_1 === "yColumn_1" ? suodatus.xColumn_1 = "Työpaikat"
      : suodatus.xColumn_1
      })
  )


//Table
export const all_tyonv_12ti_tbl = all_tyonv_12ti
  .map((d) => ({
    "Vuosi/kk": d.xColumn,
    "Työttömät työnhakijat": +d.yColumn,
    "Avoimet työpaikat": +d.yColumn_1,
    "Erotus": +d.yColumn_1-+d.yColumn
  }))  

