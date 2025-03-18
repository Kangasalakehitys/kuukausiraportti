---
title: Työpaikat ja työvoima - toimialat
---

```js
//Texts import
import {texts} from "../../data/report/texts.js";
//Data import
import {tyokay_115h,all_tyokay_115h,tbl_tyokay_115h,part_1_tyokay_115h,tbl_part_1_tyokay_115h,part_2_tyokay_115h,tbl_part_2_tyokay_115h} from "../../pages/tyopaikat/toimiala.js";
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

# Toimialat

Tähän tekstiä toimialojen kehityksestä

## Alaotsikko

Tähän tekstiä toimialojen kehityksestä

```js
//Timeformat
const formatYear4 = utcFormat("%Y");

//Filter correct text
const txt_1 = texts.filter((element) => {
                  return element.cat_1_fi === "Työpaikat ja työvoima"
                });

//Chart labels
const tlb_all_tyokay_115h = txt_1[0].cat_2_fi
const sbtbl_all_tyokay_115h = ""
const cptl__all_tyokay_115h = "Kuva: " + tyokay_115h[0].label + "  (Lähde: " + tyokay_115h[0].source + ", päivitetty: " + tyokay_115h[0].updated.slice(0, 10) + ")"
const x_all_tyokay_115h = "Vuosi"
const y_all_tyokay_115h = "Lkm"
const x = "xColumn"
const y = "yColumn"
const category = "xColumn_1"


```
<!-- Työpaikat yhteensä Chart -->
<div class="grid grid-cols-1">
    <div class="card">${
            resize((width) => 
                lineChart_1(all_tyokay_115h, x, y, tlb_all_tyokay_115h, sbtbl_all_tyokay_115h, cptl__all_tyokay_115h, x_all_tyokay_115h,y_all_tyokay_115h, COLOR_1)
            )
        }
    </div>
</div>

<!-- Työpaikat yhteensä Tbl -->
<div class="grid grid-cols-1">
    <div class="card">
        <h2>Työpaikat yhteensä</h2>
        ${Inputs.table(tbl_tyokay_115h, {rows: 30})}
    </div>
</div>

<!-- Työpaikat toimialoittain OSA 1 Chart -->

<div class="grid grid-cols-1">
    <div class="card">${
            resize((width) => 
                lineChart_multi(part_1_tyokay_115h, x, y, category, tlb_all_tyokay_115h, sbtbl_all_tyokay_115h, cptl__all_tyokay_115h, x_all_tyokay_115h,y_all_tyokay_115h, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>

<!-- Työpaikat osa1 Tbl -->
<div class="grid grid-cols-1">
    <div class="card">
        <h2>${texts[0].cat_2_fi} 1/2</h2>
        ${Inputs.table(tbl_part_1_tyokay_115h, {rows: 30})}
    </div>
</div>

<!-- Työpaikat toimialoittain OSA 2 Chart -->
<div class="grid grid-cols-1">
    <div class="card">${
            resize((width) => 
                lineChart_multi(part_2_tyokay_115h, x, y, category, tlb_all_tyokay_115h, sbtbl_all_tyokay_115h, cptl__all_tyokay_115h, x_all_tyokay_115h,y_all_tyokay_115h, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>

<!-- Työpaikat Osa2 Tbl -->
<div class="grid grid-cols-1">
    <div class="card">
        <h2>${texts[0].cat_2_fi} 2/2</h2>
        ${Inputs.table(tbl_part_2_tyokay_115h, {rows: 30})}
    </div>
</div>


