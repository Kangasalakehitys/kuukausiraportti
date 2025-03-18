---
title: Työpaikat ja työvoima - omavaraisuusaste
---

```js
//Texts import
import {texts} from "../../data/report/texts.js";
//Data import
import {tyokay_125s,tbl_tyokay_tyokay_125s} from "../../pages/tyopaikat/omavaraisuus.js";
//Chart import
import {
lineChart_1,    
lineChart_multi, 
lineChart_multi_avg} from "../../components/line_chart.js";
//Module imports
import * as d3 from "npm:d3";
import {utcFormat} from "d3-time-format";

//Variable import
import {
KUNTA_ID,
COLOR_1,
COLOR_2,
COLOR_3,
COLOR_4,
COLOR_5,
COLOR_6,
COLOR_7,
COLOR_8,
COLOR_9,
COLOR_10,
COLOR_11,
COLOR_12,
COLOR_13,
COLOR_14,
COLOR_15
} from "../../variables/variables.js";

```

```js
//Chart labels
const tlb_all_tyokay_125s = "Työpaikkaomavaraisuus-%"
const sbtbl_all_tyokay_125s = ""
const cptl__all_tyokay_125s = "Kuva: " + tyokay_125s[0].label + "  (Lähde: " + tyokay_125s[0].source + ", päivitetty: " + tyokay_125s[0].updated.slice(0, 10) + ")"
const x_all_tyokay_125s = "Vuosi"
const y_all_tyokay_125s = "Lkm"
const x = "xColumn"
const y = "yColumn"

```

<!-- Omavaraisuusaste Chart -->
<div class="grid grid-cols-1">
    <div class="card">${
            resize((width) => 
                lineChart_1(tyokay_125s, x, y, tlb_all_tyokay_125s, sbtbl_all_tyokay_125s, cptl__all_tyokay_125s, x_all_tyokay_125s,y_all_tyokay_125s, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>

<!-- Omavaraisuusaste Tbl -->
<div class="grid grid-cols-1">
    <div class="card">
        <h2>Työpaikat yhteensä</h2>
        ${Inputs.table(tbl_tyokay_tyokay_125s, {rows: 30})}
    </div>
</div>
