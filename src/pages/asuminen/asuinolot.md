---
title: Rakentaminen ja asuminen - Asuinolot
toc: true
---

```js
//Texts import
import {texts} from "../../data/report/texts.js"
//Data import
import {asas_116e,asas_116e_tbl, asas_116e_hallinta,names_asas_116e} from "./asuinolot.js"
//Chart import
//import {facedBar_vert,stackBar_vert} from "../../components/faced_bar.js"
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

display(asas_116e_hallinta)


```

# Asuinolot

Tekstiäää

## Vanhat osakeasunnot

Tekstiäää

```js
//Timeformat
const formatYear4 = utcFormat("%Y");

//Chart labels
const title_label = txt_1[0].cat_2_fi
const subTitle_label = ""
const captionTitle_label = "Kuva 1. " + asas_116e_hallinta[0].label + "  (Lähde: " + asas_116e_hallinta[0].source + ", päivitetty: " + asas_116e_hallinta[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuosi"
const yColumn_label = "Asuntokunnat lukumäärä"
const x = "xColumn"
const y = "yColumn"
const category = "xColumn_1"


```
<div class="grid grid-cols-1">
    <div class="card">${
            resize((width) => 
                lineChart_multi(asas_116e_hallinta, x, y, category, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>


<div class="grid grid-cols-1">
    <div class="card">
        <h2>Vanhojen asuntojen neliöhinnat</h2>
        ${Inputs.table(asas_116e_tbl, {rows: 30})}
    </div>
</div>



