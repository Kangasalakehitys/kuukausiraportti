import {FileAttachment} from "observablehq:stdlib";
import {utcFormat} from "d3-time-format";
import {
  KUNTA_ID
} from "../../variables/variables.js";

//Timeformat
const formatYear4 = utcFormat("%Y");



//Data tulo
export const muuttoliike_tulo = (await FileAttachment("../../data/stat/muuttoliike/hopea_muvamuu_12pn.json")
              .json({typed: true}))
                .map(d => ({
                    ...d, 
                    source: d.data.xColumn_2,
                    target: d.data.xColumn_1,
                    value: +d.data.yColumn
                })).filter(function (suodatus) {
                  return (
                    suodatus.source === 'KU' + KUNTA_ID
                  )
                })
