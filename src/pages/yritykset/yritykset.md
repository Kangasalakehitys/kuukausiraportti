---
title: Työpaikat ja työvoima - toimialat
---

```js
//Texts import
import {texts} from "../../data/report/texts.js";
//Data import
import {aly_pxt_11yq,all_aly_pxt_11yq,flat_all_aly_pxt_11yq,part_1_aly_pxt_11yq, part_2_aly_pxt_11yq} from "./yritykset.js";
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

//Moving average input
const movingRange = 1;
const movingInput = Inputs.range([movingRange, 16], {label: html`Liukuva keskiarvo:`, step: 1, value: 8});
const movingGen = Generators.input(movingInput);
movingInput.querySelector("input[type=number]").remove();

```

<div class="grid grid-cols-1">
    <div class="card">
        <h1>Yritykset</h1>
       Osiosta löydät tietoa aloittaneista yrityksistä ja toimialoista <br><br>
    </div>
</div>
<div class="grid grid-cols-1">
    <div class="card">
        <h2>Yrityskanta</h2>
        Voit tarkistella ja tasoittaa kvartaalilukemaa liukuvalla keskiarvolla alapuolen vetovalikon kautta. Oletuksena kahden vuoden (8 kvartaalin) arvo<br><br>
        <h2 class="center">${movingGen} kvartaalia</h2>
        ${movingInput}
        <br>
    </div>
</div>

```js
//Timeformat
const formatYear4 = utcFormat("%Y");

//Filter correct text
const txt_1 = texts.filter((element) => {
                  return element.cat_1_fi === "Työpaikat ja työvoima"
                });


//Chart labels
const data = all_aly_pxt_11yq
const title_label = ""
const subTitle_label = ""
const captionTitle_label = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuosi"
const yColumn_label = "Lkm"
const x = "xColumn"
const y = "yColumn_2"
const category = "xColumn_1"
const time = "%Y"

//Chart labels
const data_1 = flat_all_aly_pxt_11yq
const title_label_1 = ""
const subTitle_label_1 = ""
const captionTitle_label_1 = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_1 = "Vuosi"
const yColumn_label_1 = "Lkm"
const x_1 = "xColumn"
const y_1 = "yColumn"
const category_1 = "xColumn_1"
const time_1 = "%Y"

//Chart labels
const data_2 = part_1_aly_pxt_11yq
const title_label_2 = ""
const subTitle_label_2 = ""
const captionTitle_label_2 = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_2 = "Vuosi"
const yColumn_label_2 = "Lkm"
const x_2 = "xColumn"
const y_2 = "yColumn_2"
const category_2 = "xColumn_1"
const time_2 = "%Y"

const data_3 = part_2_aly_pxt_11yq
const title_label_3 = ""
const subTitle_label_3 = ""
const captionTitle_label_3 = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_3 = "Vuosi"
const yColumn_label_3 = "Lkm"
const x_3 = "xColumn"
const y_3 = "yColumn_2"
const category_3 = "xColumn_1"
const time_3 = "%Y"



```

<div class="grid grid-cols-2">
  <div class="card">
${
            resize((width) => 
                lineChart_multi_avg(data, x, y, category, time, movingGen, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
  </div>
    <div class="card">
${
            resize((width) => 
                lineChart_multi_avg(data_1, x_1, y_1, category_1, time_1, movingGen, title_label_1, subTitle_label_1, captionTitle_label_1, xColumn_label_1,yColumn_label_1, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>
<div class="grid grid-cols-2">
  <div class="card">
  <h2>Yrityskanta toimialoittain 1/2</h2>
${
            resize((width) => 
                lineChart_multi_avg(data_2, x_2, y_2, category_2, time_2, movingGen, title_label_2, subTitle_label_2, captionTitle_label_2, xColumn_label_2,yColumn_label_2, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
  </div>
    <div class="card">
      <h2>Yrityskanta toimialoittain 2/2</h2>
${
            resize((width) => 
                lineChart_multi_avg(data_3, x_3, y_3, category_3, time_3, movingGen, title_label_3, subTitle_label_3, captionTitle_label_3, xColumn_label_3,yColumn_label_3, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
    </div>
</div>