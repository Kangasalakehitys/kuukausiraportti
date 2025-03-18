---
title: Työpaikat ja työvoima - työvoima
---

```js
//Texts import
import {texts} from "../../data/report/texts.js";
//Data import
import {tyokay_115b,all_tyokay_115b,tbl_tyokay_115b, part_1_tyokay_115b, tbl_part_1_tyokay_115b} from "../../pages/tyopaikat/tyovoima.js";
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


//Timeformat
const formatYear4 = utcFormat("%Y");


//Filter correct text
const txt_1 = texts.filter((element) => {
                  return element.cat_1_fi === "Työpaikat ja työvoima"
                });

//Chart labels
const tlb_all_tyokay_115b = txt_1[0].cat_2_fi
const sbtbl_all_tyokay_115b = ""
const cptl__all_tyokay_115b = "Kuva: " + tyokay_115b[0].label + "  (Lähde: " + tyokay_115b[0].source + ", päivitetty: " + tyokay_115b[0].updated.slice(0, 10) + ")"
const x_all_tyokay_115b = "Vuosi"
const y_all_tyokay_115b = "Lkm"
const x = "xColumn"
const y = "yColumn"
const category = "xColumn_1"


```

<!-- Työvoima, työttömät ja työlliset Chart -->
<div class="grid grid-cols-1">
    <div class="card">${
            resize((width) => 
                lineChart_multi(part_1_tyokay_115b, x, y, category, tlb_all_tyokay_115b, sbtbl_all_tyokay_115b, cptl__all_tyokay_115b, x_all_tyokay_115b,y_all_tyokay_115b, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>

<!-- Työvoima, työttömät ja työlliset Tbl -->
<div class="grid grid-cols-1">
    <div class="card">
        <h2>Työpaikat yhteensä</h2>
        ${Inputs.table(tbl_part_1_tyokay_115b, {rows: 30})}
    </div>
</div>

