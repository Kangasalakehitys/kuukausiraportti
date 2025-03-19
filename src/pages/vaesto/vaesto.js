import {FileAttachment} from "observablehq:stdlib";
import {utcFormat} from "d3-time-format";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data
export const avain_142h = (await FileAttachment("../../data/stat/avainluvut/avainluvut_142h.json")
            .json())
                .map(d => ({
                    ...d, 
                    xColumn: new Date(d.data.xColumn),
                    yColumn: d.data.yColumn_1,
                    yColumn_2: d.data.yColumn_2,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))

                //Data
export const avain_142h_laaja_1 = (await FileAttachment("../../data/stat/avainluvut/avainluvut_142h_laaja1.json")
.json())
    .map(d => ({
        ...d, 
        xColumn: new Date(d.data.xColumn),
        yColumn: d.data.yColumn,
        yColumn_1: +d.data.yColumn_1,
        yColumn_2: +d.data.yColumn_2,
        yColumn_3: +d.data.yColumn_3,
        yColumn_4: +d.data.yColumn_4,
        yColumn_5: +d.data.yColumn_5,
        yColumn_6: +d.data.yColumn_6,
        yColumn_7: +d.data.yColumn_7,
        yColumn_8: +d.data.yColumn_8,
        yColumn_9: +d.data.yColumn_9,
        yColumn_10: +d.data.yColumn_10,
        yColumn_11: +d.data.yColumn_11,
        yColumn_12: +d.data.yColumn_12,
        yColumn_13: +d.data.yColumn_13,
        yColumn_14: +d.data.yColumn_14,
        yColumn_15: +d.data.yColumn_15,
        yColumn_16: +d.data.yColumn_16,
        yColumn_17: +d.data.yColumn_17,
        yColumn_18: +d.data.yColumn_18,
        yColumn_19: +d.data.yColumn_19,
        yColumn_20: +d.data.yColumn_20,
        yColumn_21: +d.data.yColumn_21,
        yColumn_22: +d.data.yColumn_22,
        yColumn_23: +d.data.yColumn_23,
        yColumn_24: +d.data.yColumn_24,
        updated: d.meta.updated,
        label: d.meta.label,
        source: d.meta.source
    }))



//Table
export const avain_142h_tbl = avain_142h
  .map((d) => ({
    "Vuosi": formatYear4(d.xColumn),
    "Väestö": d.yColumn
  }));