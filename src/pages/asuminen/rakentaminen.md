---
title: Asuminen ja rakentaminen
---

```js
//Texts import
import {texts} from "../../data/report/texts.js";
//Chart import
import {
lineChart_1,    
lineChart_multi, 
lineChart_multi_avg} from "../../components/line_chart.js";
import {facedBar_vert,stackBar_vert, basicBar_vert} from "../../components/faced_bar.js"
//Data import
import {part_1_asas_116f} from "./valmistuneet.js"
import {rakke_116j} from "./kesamokit.js"

//Module imports
import * as d3 from "d3";
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



//Timeformat
const formatYearQuart = utcFormat("%Y");

//Chart labels
const data = part_1_asas_116f
const title_label = "Joku otsikko"
const subTitle_label = ""
const captionTitle_label = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label = ""
const yColumn_label = "Lkm"
const x = "xColumn"
const y = "yColumn_1"
const category = "xColumn_1"
const time = "%Y"

//Chart labels
const data_2 = rakke_116j
const title_label_2 = "Kesämökit"
const subTitle_label_2 = ""
const captionTitle_label_2 = "" + data_2[0].label + "  (Lähde: " + data_2[0].source + ", päivitetty: " + data_2[0].updated.slice(0, 10) + ")"
const xColumn_label_2 = "Vuosi"
const yColumn_label_2 = "Lkm"
const x_2 = "xColumn"
const y_2 = "yColumn"
const time_2 = "%Y"

```
<div class="grid grid-cols-1">
    <div class="card">
        <h1>Asuminen ja rakentaminen</h1>
       Osiosta löydät tietoa asunnoista talotyypeittäin, vanhojen osakehuoneistojen neliöhintoja sekä kesämökkien lukumäärän. <br><br>
    </div>
</div>
<div class="grid grid-cols-2">
  <div class="card">
  <h2>Asunnot rakennusvuoden mukaan</h2>
${
            resize((width) => 
                facedBar_vert(data, x, y, category, time, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
  </div>
    <div class="card">
    </div>
</div>

<div class="grid grid-cols-2">
    <div class="card">${
            resize((width) => 
                lineChart_1(data_2, x_2, y_2, time_2, title_label_2, subTitle_label_2, captionTitle_label_2, xColumn_label_2,yColumn_label_2, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
        <div class="card">
    </div>
</div>

