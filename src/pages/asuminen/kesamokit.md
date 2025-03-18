---
title: Rakentaminen ja asuminen - kesämökit
toc: true
---

```js
//Texts import
import {texts} from "../../data/report/texts.js"
//Data import
import {rakke_116j,rakke_116j_tbl} from "./kesamokit.js"
//Chart import
import {
lineChart_1,    
lineChart_multi, 
lineChart_multi_avg} from "../../components/line_chart.js";
//Module imports
import * as d3 from "npm:d3"
import {utcFormat} from "d3-time-format"
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
} from "../../variables/variables.js"
```
```js
//Filter correct text
const txt_1 = texts.filter((element) => {return element.cat_1_fi === "Rakentaminen ja asuminen"})

```

# ${texts[0].cat_1_fi}

## Kesämökit

Tekstiäää

```js
//Timeformat
const formatYear4 = utcFormat("%Y");

//Chart labels
const title_label = "Kesämökit"
const subTitle_label = ""
const captionTitle_label = "Kuva 1. " + rakke_116j[0].label + "  (Lähde: " + rakke_116j[0].source + ", päivitetty: " + rakke_116j[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuosi 2023"
const yColumn_label = "Lkm"
const x = "xColumn"
const y = "yColumn"




```
<div class="grid grid-cols-1">
    <div class="card">${
            resize((width) => 
                lineChart_1(rakke_116j, x, y, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>


</div>
<div class="grid grid-cols-1">
    <div class="card">
        <h2>Kesämökit</h2>
        ${Inputs.table(rakke_116j_tbl, {rows: 30})}
    </div>
</div>



