---
title: Väestö - ikäpyramidi
toc: true
---

```js
//Functions import
import {serialize} from "../../functions/serialize.js";
//Texts import
import {texts} from "../../data/report/texts.js";
//Data import
import {vaenn_14wx,all_vaenn_14wx} from "./pyramidi.js";
//Chart import
import {pyramidPlot} from "../../components/pyramid.js";
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

display(txt_1)
display(all_vaenn_14wx)


```

# otsikko

sdfsdfsdfsd

## Väestön kehitys

Tekstiäää

```js
//Timeformat
const formatYear4 = utcFormat("%Y");

//Chart labels
const title_label = txt_1[0].cat_2_fi
const subTitle_label = ""
const captionTitle_label = "Kuva 1. " + all_vaenn_14wx[0].label + "  (Lähde: " + all_vaenn_14wx[0].source + ", päivitetty: " + all_vaenn_14wx[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuosi"
const yColumn_label = "Ikä"

```

<div class="grid grid-cols-1">
    <div class="card">${
            resize((width) => 
                pyramidPlot(all_vaenn_14wx, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>


