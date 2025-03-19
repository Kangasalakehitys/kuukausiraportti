import {FileAttachment} from "observablehq:stdlib";
import {utcFormat} from "d3-time-format";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data all
export const rakke_116j = (await FileAttachment("../../data/stat/asuminen/rakke_116j.json")
            .json())
                .map(d => ({
                    ...d, 
                    xColumn: new Date(d.data.xColumn),
                    yColumn: +d.data.yColumn,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))
