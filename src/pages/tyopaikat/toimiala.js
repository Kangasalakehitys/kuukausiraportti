import {FileAttachment} from "observablehq:stdlib";
import {utcFormat} from "d3-time-format";

//Timeformat
const formatYear4 = utcFormat("%Y");

// //Data
export const tyokay_115h = (await FileAttachment("../../data/stat/tyossakaynti/tyokay_115h.json")
            .json())
                .map(d => ({
                    ...d,
                    xColumn_1: d.data.xColumn_1, 
                    xColumn: new Date(d.data.xColumn_2),
                    yColumn: +d.data.yColumn_1,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))

//Filters
export const all_tyokay_115h = tyokay_115h.filter(function (suodatus) {
    if (suodatus.xColumn_1 == "SSS") return  suodatus.xColumn_1 = "Yhteensä"
});

//Toimialat 
export const part_1_tyokay_115h = tyokay_115h.filter(function (suodatus) {

    if (
      suodatus.xColumn_1 == "C" || 
      suodatus.xColumn_1 == "Q" || 
      suodatus.xColumn_1 == "F" ||
      suodatus.xColumn_1 == "N" ||
      suodatus.xColumn_1 == "P" ||
      suodatus.xColumn_1 == "G" ||
      suodatus.xColumn_1 == "M"
      )
     return  suodatus.xColumn_1
  
});

export const part_2_tyokay_115h = tyokay_115h.filter(function (suodatus) {

    if (
      suodatus.xColumn_1 == "A" || 
      suodatus.xColumn_1 == "B" || 
      suodatus.xColumn_1 == "D" ||
      suodatus.xColumn_1 == "E" ||
      suodatus.xColumn_1 == "H" ||
      suodatus.xColumn_1 == "I" ||
      suodatus.xColumn_1 == "J" ||
      suodatus.xColumn_1 == "K" ||
      suodatus.xColumn_1 == "L" ||
      suodatus.xColumn_1 == "O" ||
      suodatus.xColumn_1 == "R" ||
      suodatus.xColumn_1 == "S" ||
      suodatus.xColumn_1 == "T" ||
      suodatus.xColumn_1 == "U"
      )
     return  suodatus.xColumn_1
});
// //Change all names
const part_3_tyokay_115h = tyokay_115h.filter(function (suodatus) {

    return suodatus.xColumn_1 == "C" ? suodatus.xColumn_1 = "C Teollisuus"
      : suodatus.xColumn_1 == "Q" ? suodatus.xColumn_1 = "Q Terveys- ja sosiaalipalvelut"
      : suodatus.xColumn_1 == "F" ? suodatus.xColumn_1 = "F Rakentaminen"
      : suodatus.xColumn_1 == "N" ? suodatus.xColumn_1 = "N Hallinto- ja tukipalvelutoiminta"
      : suodatus.xColumn_1 == "P" ? suodatus.xColumn_1 = "P Koulutus"
      : suodatus.xColumn_1 == "G" ? suodatus.xColumn_1 = "G Tukku- ja vähittäiskauppa"
      : suodatus.xColumn_1 == "A" ? suodatus.xColumn_1 = "A Maatalous, metsätalous ja kalatalous"
      : suodatus.xColumn_1 == "B" ? suodatus.xColumn_1 = "B Kaivostoiminta ja louhinta"
      : suodatus.xColumn_1 == "D" ? suodatus.xColumn_1 = "D Sähkö-, kaasu- ja lämpöhuolto"
      : suodatus.xColumn_1 == "E" ? suodatus.xColumn_1 = "E Vesihuolto, viemäri- ja jätevesihuolto"
      : suodatus.xColumn_1 == "H" ? suodatus.xColumn_1 = "H Kuljetus ja varastointi"
      : suodatus.xColumn_1 == "I" ? suodatus.xColumn_1 = "I Majoitus- ja ravitsemistoiminta"
      : suodatus.xColumn_1 == "J" ? suodatus.xColumn_1 = "J Informaatio ja viestintä"
      : suodatus.xColumn_1 == "K" ? suodatus.xColumn_1 = "K Rahoitus- ja vakuutustoiminta"
      : suodatus.xColumn_1 == "L" ? suodatus.xColumn_1 = "L Kiinteistöalan toiminta"
      : suodatus.xColumn_1 == "M" ? suodatus.xColumn_1 = "M Ammatillinen, tieteellinen ja tekninen toiminta"
      : suodatus.xColumn_1 == "O" ? suodatus.xColumn_1 = "N Hallinto- ja tukipalvelutoiminta"
      : suodatus.xColumn_1 == "R" ? suodatus.xColumn_1 = "R Taiteet, viihde ja virkistys"
      : suodatus.xColumn_1 == "S" ? suodatus.xColumn_1 = "S Muu palvelutoiminta"
      : suodatus.xColumn_1 == "T" ? suodatus.xColumn_1 = "T Kotitalouksien toiminta työnantajina"
      : suodatus.xColumn_1 == "U" ? suodatus.xColumn_1 = "U Kansainvälisten organisaatioiden ja toimielinten toiminta"
      : suodatus.xColumn_1
  
});

//Tables
export const tbl_tyokay_115h = all_tyokay_115h
  .map((d) => ({
    "Vuosi": formatYear4(d.xColumn),
    "Työpaikat": d.yColumn
  }));

export const tbl_part_1_tyokay_115h = part_1_tyokay_115h
  .map((d) => ({
    "Vuosi": formatYear4(d.xColumn),
    "Toimiala": d.xColumn_1,
    "Työpaikat": d.yColumn
  }));

export const tbl_part_2_tyokay_115h = part_2_tyokay_115h
  .map((d) => ({
    "Vuosi": formatYear4(d.xColumn),
    "Toimiala": d.xColumn_1,
    "Työpaikat": d.yColumn
  }));


