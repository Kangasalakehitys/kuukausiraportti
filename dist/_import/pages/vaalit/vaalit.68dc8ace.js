import {FileAttachment} from "../../../_observablehq/stdlib.63717d9f.js";
import {utcFormat} from "../../../_node/d3-time-format@4.1.0/index.4b8e4965.js";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Data
export const kvaa_pxt_12g2 = (await FileAttachment({"name":"../../../data/stat/vaalit/kvaa_pxt_12g2.json","mimeType":"application/json","path":"../../../_file/data/stat/vaalit/kvaa_pxt_12g2.e283d2cd.json","lastModified":1741167695090,"size":3154}, import.meta.url)
            .json())
                .map(d => ({
                    ...d, 
                    xColumn: new Date(d.data.xColumn),
                    xColumn_1: d.data.xColumn_1,
                    yColumn: +d.data.yColumn,
                    yColumn_1: +d.data.yColumn_1,
                    yColumn_2: +d.data.yColumn_2,
                    yColumn_3: +d.data.yColumn_3,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))

export const kvaa_pxt_12g3 = (await FileAttachment({"name":"../../../data/stat/vaalit/kvaa_pxt_12g3.json","mimeType":"application/json","path":"../../../_file/data/stat/vaalit/kvaa_pxt_12g3.9b08f257.json","lastModified":1741169865084,"size":122859}, import.meta.url)
            .json())
                .map(d => ({
                    ...d, 
                    xColumn: new Date(d.data.xColumn),
                    xColumn_1: d.data.xColumn_1,
                    xColumn_2: d.data.xColumn_2,
                    yColumn: +d.data.yColumn,
                    yColumn_1: +d.data.yColumn_1,
                    yColumn_2: +d.data.yColumn_2,
                    yColumn_3: +d.data.yColumn_3,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                })).filter(function (suodatus) {
                    return suodatus.xColumn_2 == "00" ? suodatus.xColumn_2 = "Yhteensä"
                    : suodatus.xColumn_2 == "03" ? suodatus.xColumn_2 = "KOK"
                    : suodatus.xColumn_2 == "01" ? suodatus.xColumn_2 = "SDP"
                    : suodatus.xColumn_2 == "04" ? suodatus.xColumn_2 = "KESK, (**LKP-84)"
                    : suodatus.xColumn_2 == "02" ? suodatus.xColumn_2 = "PS"
                    : suodatus.xColumn_2 == "05" ? suodatus.xColumn_2 = "VIHR"
                    : suodatus.xColumn_2 == "06" ? suodatus.xColumn_2 = "VAS, (+DEVA-88)"
                    : suodatus.xColumn_2 == "07" ? suodatus.xColumn_2 = "RKP"
                    : suodatus.xColumn_2 == "08" ? suodatus.xColumn_2 = "KD"
                    : suodatus.xColumn_2 == "09" ? suodatus.xColumn_2 = "LIIKE"
                    : suodatus.xColumn_2 == "21" ? suodatus.xColumn_2 = "KRIP"
                    : suodatus.xColumn_2 == "14" ? suodatus.xColumn_2 = "Femin.p."
                    : suodatus.xColumn_2 == "11" ? suodatus.xColumn_2 = "Piraattip."
                    : suodatus.xColumn_2 == "20" ? suodatus.xColumn_2 = "SKP, (+ LLP-96 )"
                    : suodatus.xColumn_2 == "12" ? suodatus.xColumn_2 = "EOP"
                    : suodatus.xColumn_2 == "16" ? suodatus.xColumn_2 = "SIN"
                    : suodatus.xColumn_2 == "10" ? suodatus.xColumn_2 = "LIBE"
                    : suodatus.xColumn_2 == "19" ? suodatus.xColumn_2 = "AP"
                    : suodatus.xColumn_2 == "17" ? suodatus.xColumn_2 = "SKE"
                    : suodatus.xColumn_2 == "13" ? suodatus.xColumn_2 = "KP"
                    : suodatus.xColumn_2 == "72" ? suodatus.xColumn_2 = "IP"
                    : suodatus.xColumn_2 == "73" ? suodatus.xColumn_2 = "KTP"
                    : suodatus.xColumn_2 == "74" ? suodatus.xColumn_2 = "STP, (+IPU-92)"
                    : suodatus.xColumn_2 == "75" ? suodatus.xColumn_2 = "KA, (+SEP-88--96)"
                    : suodatus.xColumn_2 == "76" ? suodatus.xColumn_2 = "Vapausp."
                    : suodatus.xColumn_2 == "77" ? suodatus.xColumn_2 = "Muutos2011"
                    : suodatus.xColumn_2 == "78" ? suodatus.xColumn_2 = "SSP (2008)"
                    : suodatus.xColumn_2 == "79" ? suodatus.xColumn_2 = "SKS (2004), (+NUORS-96)"
                    : suodatus.xColumn_2 == "80" ? suodatus.xColumn_2 = "LIB (2004)**"
                    : suodatus.xColumn_2 == "84" ? suodatus.xColumn_2 = "SI (2004), (+POP-76--88)"
                    : suodatus.xColumn_2 == "86" ? suodatus.xColumn_2 = "YVP (2004), (+REM-00)"
                    : suodatus.xColumn_2 == "88" ? suodatus.xColumn_2 = "EKO (*1996)"
                    : suodatus.xColumn_2 == "89" ? suodatus.xColumn_2 = "KIPU (2000), (+NAISL-92)"
                    : suodatus.xColumn_2 == "99" ? suodatus.xColumn_2 = "Muut"
                    : suodatus.xColumn_2
                    }).filter(function (suodatus) {
                    return suodatus.yColumn_2 > 0
                    })
        
