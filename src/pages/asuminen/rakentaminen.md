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
import {part_1_asas_116f,asas_116f_tbl,all_asas_116f,asas_116f,names_asas_116f_2} from "./valmistuneet.js"
import {names_ashi_13mx,ashi_13mx,ashi_13mx_tbl} from "./vanhat_neliohinta.js"
import {rakke_116j,rakke_116j_tbl} from "./kesamokit.js"

const files = [
  {id: 1, file: FileAttachment("../../data/stat/asuminen/statfin_asas_pxt_13ui.json")},
]

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
const data_1 = names_ashi_13mx
const title_label_1 = "Joku otsikko"
const subTitle_label_1 = ""
const captionTitle_label_1 = "" + data_1[0].label + "  (Lähde: " + data_1[0].source + ", päivitetty: " + data_1[0].updated.slice(0, 10) + ")"
const xColumn_label_1 = "Vuosi"
const yColumn_label_1 = "EUR/m2 keskiarvo"
const x_1 = "xColumn"
const y_1 = "yColumn"
const category_1 = "xColumn_1"
const time_1 = "%Y"

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

let data_3 = await files[0].file.json();

const data_housing = data_3.map(d => ({
        xColumn: new Date(d.Vuosineljännes
        .replace("Q1*","-01")
        .replace("Q2*","-04")
        .replace("Q3*","-07")
        .replace("Q4*","-10")
        .replace("Q1","-01")
        .replace("Q2","-04")
        .replace("Q3","-07")
        .replace("Q4","-10")),
        yColumn: +d.Asuntokuntia,
        yColumn_1: d.Talotyyppi,
        yColumn_2: d['Asuntokunnan koko'],
        yColumn_3: d['Asuntokunnan vanhimman ikä']
    }))

        // .replace("Q1*","-01-01")
        // .replace("Q2*","-04-01")
        // .replace("Q3*","-07-01")
        // .replace("Q4*","-10-01")
        // .replace("Q1","-01-01")
        // .replace("Q2","-04-01")
        // .replace("Q3","-07-01")
        // .replace("Q4","-10-01")),


const data_housing_house = data_housing.map(d => ({
        xColumn: d.xColumn,
        yColumn: +d.yColumn,
        yColumn_1: d.yColumn_1,
        yColumn_2: d.yColumn_2,
        yColumn_3: d.yColumn_3
    }))
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "Omakoti- ja paritalot" || 
        suodatus.yColumn_1 == "Rivitalot" || 
        suodatus.yColumn_1 == "Kerrostalot" ||
        suodatus.yColumn_1 == "Muut rakennukset"
        )
        return  suodatus.yColumn_1
        })
    .filter((suodatus) => {
        if (suodatus.yColumn_2 == "Kaikki asuntokunnat")
        return  suodatus.yColumn_2
        })
    .filter((suodatus) => {
        if (suodatus.yColumn_3 == "Kaikki ikäluokat")
        return  suodatus.yColumn_3
        });

const data_housing_kerros = data_housing.map(d => ({
        xColumn: d.xColumn,
        yColumn: +d.yColumn,
        yColumn_1: d.yColumn_1,
        yColumn_2: d.yColumn_2,
        yColumn_3: d.yColumn_3
    }))
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "Kerrostalot"
        )
        return  suodatus.yColumn_1
        })
    .filter((suodatus) => {
        if (suodatus.yColumn_2 != "Kaikki asuntokunnat")
        return  suodatus.yColumn_2
        })
    .filter((suodatus) => {
        if (suodatus.yColumn_3 == "Kaikki ikäluokat")
        return  suodatus.yColumn_3
        });

const data_housing_omakoti = data_housing.map(d => ({
        xColumn: d.xColumn,
        yColumn: +d.yColumn,
        yColumn_1: d.yColumn_1,
        yColumn_2: d.yColumn_2,
        yColumn_3: d.yColumn_3
    }))
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "Omakoti- ja paritalot"
        )
        return  suodatus.yColumn_1
        })
    .filter((suodatus) => {
        if (suodatus.yColumn_2 != "Kaikki asuntokunnat")
        return  suodatus.yColumn_2
        })
    .filter((suodatus) => {
        if (suodatus.yColumn_3 == "Kaikki ikäluokat")
        return  suodatus.yColumn_3
        });

const data_housing_rivitalot = data_housing.map(d => ({
        xColumn: d.xColumn,
        yColumn: +d.yColumn,
        yColumn_1: d.yColumn_1,
        yColumn_2: d.yColumn_2,
        yColumn_3: d.yColumn_3
    }))
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "Rivitalot"
        )
        return  suodatus.yColumn_1
        })
    .filter((suodatus) => {
        if (suodatus.yColumn_2 != "Kaikki asuntokunnat")
        return  suodatus.yColumn_2
        })
    .filter((suodatus) => {
        if (suodatus.yColumn_3 == "Kaikki ikäluokat")
        return  suodatus.yColumn_3
        });

//Chart labels
const data_4 = data_housing_house
const title_label_4 = ""
const subTitle_label_4 = ""
const captionTitle_label_4 = ""
const xColumn_label_4 = "Kvartaali"
const yColumn_label_4 = "Lkm"
const x_4 = "xColumn"
const y_4 = "yColumn"
const category_4 = "yColumn_1"
const time_4 = "%Y %q"


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
    <h2>Vanhojen osakehuoneistojen neliöhinnat</h2>
    ${
            resize((width) => 
                lineChart_multi(data_1, x_1, y_1, category_1, time_1, title_label_1, subTitle_label_1, captionTitle_label_1, xColumn_label_1,yColumn_label_1, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
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
    <h2>Asuntokunnat talotyypeittäin</h2>${
            resize((width) => 
                lineChart_multi(data_4, x_4, y_4, category_4, time_4, title_label_4, subTitle_label_4, captionTitle_label_4, xColumn_label_4,yColumn_label_4, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>


```js
//Chart labels
const data_5 = data_housing_kerros
const title_label_5 = ""
const subTitle_label_5 = ""
const captionTitle_label_5 = ""
const xColumn_label_5 = "Kvartaali"
const yColumn_label_5 = "Lkm"
const x_5 = "xColumn"
const y_5 = "yColumn"
const category_5 = "yColumn_2"
const time_5 = "%Y %q"

const data_6 = data_housing_omakoti
const title_label_6 = ""
const subTitle_label_6 = ""
const captionTitle_label_6 = ""
const xColumn_label_6 = "Kvartaali"
const yColumn_label_6 = "Lkm"
const x_6 = "xColumn"
const y_6 = "yColumn"
const category_6 = "yColumn_2"
const time_6 = "%Y %q"

const data_7 = data_housing_rivitalot
const title_label_7 = ""
const subTitle_label_7 = ""
const captionTitle_label_7 = ""
const xColumn_label_7 = "Kvartaali"
const yColumn_label_7 = "Lkm"
const x_7 = "xColumn"
const y_7 = "yColumn"
const category_7 = "yColumn_2"
const time_7 = "%Y %q"
```

<div class="grid grid-cols-2">
        <div class="card">
    <h2>Kerrostalot - asuntokunnan koon mukaan</h2>
    ${
            resize((width) => 
                lineChart_multi(data_5, x_5, y_5, category_5,  time_5, title_label_5, subTitle_label_5, captionTitle_label_5, xColumn_label_5,yColumn_label_5, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
        <div class="card">
    <h2>Omakotitalot - asuntokunnan koon mukaan</h2>
    ${
            resize((width) => 
                lineChart_multi(data_6, x_6, y_6, category_6,  time_6, title_label_6, subTitle_label_6, captionTitle_label_6, xColumn_label_6,yColumn_label_6, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>
<div class="grid grid-cols-2">
        <div class="card">
    <h2>Rivitalot - asuntokunnan koon mukaan</h2>
    ${
            resize((width) => 
                lineChart_multi(data_7, x_7, y_7, category_7,  time_7, title_label_7, subTitle_label_7, captionTitle_label_7, xColumn_label_7,yColumn_label_7, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
        <div class="card">
    </div>
</div>