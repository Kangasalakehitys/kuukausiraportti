---
title: Väestö
toc: true
---

```js
//Functions import
import {serialize} from "../../functions/serialize.js";
//Texts import
import {texts} from "../../data/report/texts.js";
//Data import
import {hopea_varak_12hk,hopea_varak_12hk_tbl,hopea_varak_12hk_tilasto, mergeAB} from "./vaesto_osa.js";
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
//Filter correct text
const txt_1 = texts.filter((element) => {
                  return element.cat_1_fi === "Väestö"
                });

display(mergeAB)

```

# ${texts[0].cat_1_fi}

sdfsdfsdfsd

## Väestön osa-alueet

Tekstiäää
${txt_1[0].text_fi}


```js
//Timeformat
const formatYear4 = utcFormat("%Y");

//Chart labels
const title_label = txt_1[0].cat_2_fi
const subTitle_label = ""
const captionTitle_label = "Kuva 1. " + hopea_varak_12hk[0].label + "  (Lähde: " + hopea_varak_12hk[0].source + ", päivitetty: " + hopea_varak_12hk[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuosi"
const yColumn_label = "Lkm"

```


<div class="grid grid-cols-1">
    <div class="card">
        <h2>Väestö</h2>
        ${Inputs.table(hopea_varak_12hk_tbl, {rows: 30})}
    </div>
</div>



