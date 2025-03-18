---
title: Vaalit
---

```js
//Texts import
import {texts} from "../../data/report/texts.js";
//Chart import
import {
lineChart_1,    
lineChart_multi, 
lineChart_multi_avg} from "../../components/line_chart.js";
//Module imports
import * as d3 from "npm:d3";
import {utcFormat} from "d3-time-format";


//Data import
import {kvaa_pxt_12g2,kvaa_pxt_12g3} from "./vaalit.js";

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
                  return element.cat_1_fi === "Vaalit"
                });

```
<div class="grid grid-cols-1">
    <div class="card">
        <h1>Vaalit</h1>
        Kuntavaalit (vuoteen 2015 asti kunnallisvaalit) ovat vaalit, joissa valitaan kuntien ja kaupunkien valtuustoihin valtuutetut ja varavaltuutetut. Suomessa kuntavaaleista säädetään perustuslaissa, kuntalaissa, vaalilaissa ja Ahvenanmaata koskien sen omassa lainsäädännössä. <em>Lähde: Wikipedia</em><br><br>
    </div>
</div>

```js
//Timeformat
const formatYear4 = utcFormat("%Y");

//Chart labels
const data = kvaa_pxt_12g2;
const title_label = "Äänioikeutetut"
const subTitle_label = ""
const captionTitle_label = "" + kvaa_pxt_12g2[0].label + "  (Lähde: " + kvaa_pxt_12g2[0].source + ", päivitetty: " + kvaa_pxt_12g2[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuosi"
const yColumn_label = "Äänioikeutetut"
const x = "xColumn"
const y = "yColumn"
const time = "%Y"

//Chart labels
const title_label_2 = "Äänestäneet"
const subTitle_label_2 = ""
const captionTitle_label_2 = "" + kvaa_pxt_12g2[0].label + "  (Lähde: " + kvaa_pxt_12g2[0].source + ", päivitetty: " + kvaa_pxt_12g2[0].updated.slice(0, 10) + ")"
const xColumn_label_2 = "Vuosi"
const yColumn_label_2 = "Äänestäneet"
const x_2 = "xColumn"
const y_2 = "yColumn_1"
const time_2 = "%Y"


//Chart labels
const title_label_3 = "Äänestysprosentti"
const subTitle_label_3 = ""
const captionTitle_label_3 = "" + kvaa_pxt_12g2[0].label + "  (Lähde: " + kvaa_pxt_12g2[0].source + ", päivitetty: " + kvaa_pxt_12g2[0].updated.slice(0, 10) + ")"
const xColumn_label_3 = "Vuosi"
const yColumn_label_3 = "Äänestysprosentti"
const x_3 = "xColumn"
const y_3 = "yColumn_2"
const time_3 = "%Y"

```

<div class="grid grid-cols-3">
  <div class="card">
    ${resize((width) => 
    lineChart_1(data, x, y, time, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
    )
    }
  </div>
  <div class="card">
    ${resize((width) => 
    lineChart_1(data, x_2, y_2, time_2, title_label_2, subTitle_label_2, captionTitle_label_2, xColumn_label_2,yColumn_label_2, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
    )
    }
  </div>
    <div class="card">
    ${resize((width) => 
    lineChart_1(data, x_3, y_3, time_3, title_label_3, subTitle_label_3, captionTitle_label_3, xColumn_label_3,yColumn_label_3, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
    )
    }
  </div>
</div>

```js
//Timeformat
const formatYear4 = utcFormat("%Y");

//Chart labels
const data_5 = kvaa_pxt_12g3.filter((suodatus) => suodatus.xColumn_2 != "Yhteensä");
const title_label_5 = "Valittujen lukumäärä"
const subTitle_label_5 = ""
const captionTitle_label_5 = "" + kvaa_pxt_12g3[0].label + "  (Lähde: " + kvaa_pxt_12g3[0].source + ", päivitetty: " + kvaa_pxt_12g3[0].updated.slice(0, 10) + ")"
const xColumn_label_5 = "Vuosi"
const yColumn_label_5 = "Valittujen lukumäärä"
const x_5 = "xColumn"
const y_5 = "yColumn_2"
const category_5 = "xColumn_2"
const time_5 = "%Y"


//Chart labels
const title_label_6 = "Osuus valituista %"
const subTitle_label_6 = ""
const captionTitle_label_6 = "" + kvaa_pxt_12g3[0].label + "  (Lähde: " + kvaa_pxt_12g3[0].source + ", päivitetty: " + kvaa_pxt_12g3[0].updated.slice(0, 10) + ")"
const xColumn_label_6 = "Vuosi"
const yColumn_label_6 = "Osuus valituista %"
const x_6 = "xColumn"
const y_6 = "yColumn_3"
const category_6 = "xColumn_2"
const time_6 = "%Y"

```
<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => 
    lineChart_multi(data_5, x_5, y_5,category_5, time_5, title_label_5, subTitle_label_5, captionTitle_label_5, xColumn_label_5,yColumn_label_5, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
    )
    }
  </div>
  <div class="card">
    ${resize((width) => 
    lineChart_multi(data_5, x_6, y_6,category_6, time_6, title_label_6, subTitle_label_6, captionTitle_label_6, xColumn_label_6,yColumn_label_6, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
    )
    }
  </div>
</div>