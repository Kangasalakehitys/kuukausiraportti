---
title: Rakentaminen ja asuminen - Vanhojen osakeasuntojen neliöhinnat
toc: true
---

```js
//Texts import
import {texts} from "../../data/report/texts.js"
//Data import
import {names_ashi_13mx,ashi_13mx,ashi_13mx_tbl} from "./vanhat_neliohinta.js"
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

display(ashi_13mx)
display(names_ashi_13mx)
```

# Vanhojen osakeasuntojen neliöhinnat

Tekstiäää

## Vanhat osakeasunnot

Tekstiäää

```js
//Timeformat
const formatYear4 = utcFormat("%Y");

//Chart labels
const title_label = txt_1[0].cat_2_fi
const subTitle_label = ""
const captionTitle_label = "Kuva 1. " + ashi_13mx[0].label + "  (Lähde: " + ashi_13mx[0].source + ", päivitetty: " + ashi_13mx[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuosi 2023"
const yColumn_label = "EUR/m2 keskiarvo"
const x = "xColumn"
const y = "yColumn"
const category = "xColumn_1"

```
<div class="grid grid-cols-1">
    <div class="card">${
            resize((width) => 
                lineChart_multi(names_ashi_13mx, x, y, category, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>


</div>
<div class="grid grid-cols-1">
    <div class="card">
        <h2>Vanhojen asuntojen neliöhinnat</h2>
        ${Inputs.table(ashi_13mx_tbl, {rows: 30})}
    </div>
</div>



