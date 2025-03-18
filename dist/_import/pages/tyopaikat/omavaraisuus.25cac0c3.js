import {FileAttachment} from "../../../_observablehq/stdlib.63717d9f.js";
import {utcFormat} from "../../../_node/d3-time-format@4.1.0/index.4b8e4965.js";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data
export const tyokay_125s = (await FileAttachment({"name":"../../../data/stat/tyossakaynti/tyokay_125s.json","mimeType":"application/json","path":"../../../_file/data/stat/tyossakaynti/tyokay_125s.1c53cb45.json","lastModified":1739534212810,"size":7586}, import.meta.url)
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