import {FileAttachment} from "observablehq:stdlib";
import {utcFormat} from "d3-time-format";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data
export const tyokay_125s = (await FileAttachment("../../data/stat/tyossakaynti/tyokay_125s.json")
            .json())
                .map(d => ({
                    ...d,
                    xColumn_1: d.data.xColumn_2, 
                    xColumn: new Date(d.data.xColumn_2),
                    yColumn: +d.data.yColumn_1,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))


    

export const tbl_tyokay_tyokay_125s = tyokay_125s
  .map((d) => ({
    "Vuosi": formatYear4(d.xColumn),
    "Omavaraisuusaste-%": d.yColumn
  }));