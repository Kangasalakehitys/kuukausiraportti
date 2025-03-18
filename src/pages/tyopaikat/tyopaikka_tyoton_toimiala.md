---
title: Työpaikat ja työvoima - kohtaanto
---

```js
//Texts import
import {texts} from "../../data/report/texts.js";
//Data import
import {tyonv_12ti_toimi,tyonv_12ti_toimi_tyoton,tyonv_12ti_toimi_tyopaikka} from "../../pages/tyopaikat/tyopaikka_tyoton_toimiala.js";
//Chart import
import {
cellMark} from "../../components/cell_mark.js";

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


//Timeformat
const formatYear4 = utcFormat("%Y");


//Filter correct text
const txt_1 = texts.filter((element) => {
                  return element.cat_1_fi === "Työpaikat ja työvoima"
                });

display(tyonv_12ti_toimi)
display(tyonv_12ti_toimi_tyoton)
display(tyonv_12ti_toimi_tyopaikka)


//Chart labels
const title_label = txt_1[0].cat_2_fi
const subTitle_label = ""
const captionTitle_label = "Kuva 1. " + tyonv_12ti_toimi[0].label + "  (Lähde: " + tyonv_12ti_toimi[0].source + ", päivitetty: " + tyonv_12ti_toimi[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuodet"
const yColumn_label = "Lkm"


```
<div class="grid grid-cols-1">
    <div class="card">${
            resize((width) => 
                cellMark(tyonv_12ti_toimi, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>