---
title: Esipuhe
---

```js
//Chart import
import {
lineChart_1,    
lineChart_multi, 
lineChart_multi_avg} from "./components/line_chart.js";

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
} from "./variables/variables.js";

import {utcFormat} from "d3-time-format";

const formatYearQuart = utcFormat("%Y %q");
```

<div class="grid grid-cols-1">
    <div class="card">
        <h1>Alkusanat</h1><br><br>
        Kuntien tilastojulkaisu tarjoaa tietoa esimerkiksi väestöstä, työmarkkinoista, asumisesta ja rakentamisesta sekä yrityksistä. Tietolähteinä käytetään pääosin Tilastokeskusta. Raporttia kehitetään yhteistyössä kuntien kanssa. Raportti julkaistaan  <a href="https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html" target="blank">LGPL 2.1 lisenssin</a> alla. Tiedot päivittyvät kuukausittain. 
    </div>
</div>
<div class="grid grid-cols-1">
    <div class="card">
        <h2>Osa-alueiden selitteet</h2>
        <table>
          <tr>
            <th>Kuvake</th>
            <th>Selite</th>
          </tr>
          <tr>
            <td><img src="./images/home.png" alt="Etusivu"></img></td>
            <td>Etusivu </td>
          </tr>
          <tr>
            <td><img src="./images/map.png" alt="Alue"></img></td>
            <td>Alueosiossa voit tarkistella kunnan yleisiä tietoja, kuten taajama-astetta ja osa-alueita.</td>
          </tr>
          <tr>
            <td><img src="./images/building.png" alt="Asuminen ja rakentaminen"></img></td>
            <td>Asuminen ja rakentaminen osiossa on tietoa esimerkiksi asunnoista talotyypeittäin ja vanhojen osakehuoneistojen neliöhintoja.</td>
          </tr>
            <tr>
            <td><img src="./images/birth.png" alt="Syntyneet"></img></td>
            <td>Syntyneet osiosta näet luonnollisen väestönlisäyksen ja syntyneet</td>
          </tr>
            <tr>
            <td><img src="./images/employment.png" alt="Työpaikat ja työllisyys"></img></td>
            <td>Työllisyys ja työpaikat osiosta saat tietoa työllisyydestä ja työttömyydestä.</td>
          </tr>
            <tr>
            <td><img src="./images/election.png" alt="Vaalit"></img></td>
            <td>Vaalit osiossa on tietoa kuntavaalien äänestysprosenteista ja puolueiden jakautumisesta</td>
          </tr>
          <tr>
            <td><img src="./images/population.png" alt="Väestö"></img></td>
            <td>Väestöosiossa on tietoa väestöstä eri ikäryhmissä sekä muuttoliikkeestä.</td>
          </tr>
          <tr>
            <td><img src="./images/cogwheels.png" alt="Yritykset"></img></td>
            <td>Yritysosiossa on tietoa yrityskannasta, aloittaneista ja lopettaneista yrityksistä.</td>
          </tr>
        </table> 
    </div>
</div>


