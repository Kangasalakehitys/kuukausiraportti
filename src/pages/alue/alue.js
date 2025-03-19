import {FileAttachment} from "observablehq:stdlib";
import {utcFormat} from "d3-time-format";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data
export const avain_142h_alue = (await FileAttachment("../../data/stat/avainluvut/avainluvut_142h_alue.json")
            .json())
                .map(d => ({
                    ...d, 
                    xColumn: new Date(d.data.xColumn),
                    yColumn: d.data.yColumn,
                    yColumn_1: d.data.yColumn_1,
                    yColumn_2: d.data.yColumn_2,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))


        