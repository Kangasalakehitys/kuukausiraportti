---
title: Syntyvyys

---



```js

const files = [
  {id: 1, file: FileAttachment("../../data/stat/syntyneet/statfin_ssaaty_pxt_121w.json")},
  {id: 2, file: FileAttachment("../../data/stat/syntyneet/statfin_ssaaty_pxt_121w_2.json")},
]





//Module imports
import * as d3 from "npm:d3";
import {utcFormat} from "d3-time-format";

import {
lineChart_1,    
lineChart_multi, 
lineChart_multi_avg} from "../../components/line_chart.js";

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
const formatYearQuart = utcFormat("%Y");






let data_synt = await files[0].file.json();
let data_lisays = await files[1].file.json();



const data = data_synt.map(d => ({
        xColumn: new Date(d.Vuosi
        .replace("Q1*","-01-01")
        .replace("Q2*","-04-01")
        .replace("Q3*","-07-01")
        .replace("Q4*","-10-01")
        .replace("Q1","-01-01")
        .replace("Q2","-04-01")
        .replace("Q3","-07-01")
        .replace("Q4","-10-01")),
        yColumn: +d.sum,
        yColumn_1: d.cat
    }))

const data_1 = data_lisays.map(d => ({
        xColumn: new Date(d.Vuosi
        .replace("Q1*","-01-01")
        .replace("Q2*","-04-01")
        .replace("Q3*","-07-01")
        .replace("Q4*","-10-01")
        .replace("Q1","-01-01")
        .replace("Q2","-04-01")
        .replace("Q3","-07-01")
        .replace("Q4","-10-01")),
        yColumn: +d.sum,
        yColumn_1: d.cat
    }))


const title_label = ""
const subTitle_label = ""
const captionTitle_label = ""
const xColumn_label = ""
const yColumn_label = "Lkm"
const x = "xColumn"
const y = "yColumn"
const category = "yColumn_1"
const time = "%Y %q"

const title_label_1 = ""
const subTitle_label_1 = ""
const captionTitle_label_1 = ""
const xColumn_label_1 = ""
const yColumn_label_1 = "Lkm"
const x_1 = "xColumn"
const y_1 = "yColumn"
const category_1 = "yColumn_1"
const time_1 = "%Y %q"

```

<div class="grid grid-cols-1">
    <div class="card">
        <h1>Syntyvyys</h1>
        Osio sisältää tietoa syntyvyydestä ja luonnollisesta väestökasvusta. Syntyneiden enemmyys eli luonnollinen väestönlisäys tarkoittaa elävänä syntyneiden ja kuolleiden erotusta.<br><br>
    </div>
</div>

<div class="grid grid-cols-2">
  <div class="card">
  <h2>Syntyneet (ennakkotieto kumulatiivisesti kvartaaleina)</h2>
    ${
            resize((width) => 
                lineChart_multi(data, x, y, category,  time, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
  </div>
  <div class="card">
  <h2>Luonnollinen väestölisäys</h2>
    ${
            resize((width) => 
                lineChart_multi(data_1, x_1, y_1, category_1,  time_1, title_label_1, subTitle_label_1, captionTitle_label_1, xColumn_label_1,yColumn_label_1, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
  </div>
</div>



