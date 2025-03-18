import {FileAttachment} from "../../../_observablehq/stdlib.63717d9f.js";
import {utcFormat} from "../../../_node/d3-time-format@4.1.0/index.4b8e4965.js";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data
export const avain_142h_alue = (await FileAttachment({"name":"../../../data/stat/avainluvut/avainluvut_142h_alue.json","mimeType":"application/json","path":"../../../_file/data/stat/avainluvut/avainluvut_142h_alue.c11ce05c.json","lastModified":1741160076579,"size":7496}, import.meta.url)
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


        