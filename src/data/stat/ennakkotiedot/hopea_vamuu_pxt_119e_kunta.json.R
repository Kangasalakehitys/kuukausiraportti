library(tidytext)
library(readr)
library(dplyr)
library(stringr)
library(jsonlite)
library(pxweb)
library(tidyr)
library(httr)
library(rjstat)
library(reshape2)

source("C:/Users/kanga/Documents/Observable/testi/src/variables/variables.R")

vuosi <- custom_vars(3)
valittu_kk <- paste(custom_vars(2), "*", sep = "")
kunta <- custom_vars(1)
k1_KU <- paste("KU", kunta, sep = "")
valitut_kunnat <- c(k1_KU)
k1_nimi <- custom_vars(5)
k1_maakunta <- custom_vars(5)

#MUUTA OTSIKOT
  title_txt <- "Väestö kolme ikäluokkaa"
  subtitle_txt <- ""
  title_x <- "<b></b>"
  title_y <- "<b>Lkm</b>"
  title_format <- "d"
  lahde_otsikko <- "Lähde:"

#-------------------DATA 1 ------------------
stat_url = "https://pxhopea2.stat.fi:443/PXWeb/api/v1/fi/Kuntien_ennakkotiedot/Kuntien_ennakkotiedot_2025/vaesto_kuukausi_vamuu_pxt_119e.px"

#SALASANA JA KÄYTTÄJÄTUNNUS TILASTO
api_username_stat = "V2144"
api_password_stat = "3682"

headers = c(
  'un' = api_username_stat,
  'pw' = api_password_stat,
  'Content-Type' = 'application/json'
)
#MUUTA PIENALUENUMEROT, JOITA HALUAT TARKISTELLA SEKÄ VUODET
body0 = '{
  "query": [
    {
      "code": "Alue",
      "selection": {
        "filter": "item",
        "values":["'
body1 = valitut_kunnat
body2 = '"]
      }
    },
    {
      "code": "Tiedot",
      "selection": {
        "filter": "item",
      "values": [
          "vm01",
          "vm11",
          "luonvalisays",
          "vm43_tulo",
          "vm43_lahto",
          "vm43_netto",
          "vm44",
          "vm41",
          "vm41_nordic",
          "vm41_eu",
          "vm42",
          "vm42_nordic",
          "vm42_eu",
          "vm4142",
          "koknetmuutto",
          "vm2126",
          "vm3136",
          "valisays",
          "vakorjaus",
          "kokmuutos",
          "vaesto"
        ]
      }
    }
  ],
  "response": {
    "format": "json-stat2"
  }
}';

body = paste(body0,body1,body2,sep="");  

px_data <- VERB("POST", url = stat_url, body = body, add_headers(headers))

# Shows raw data which is not structured and readable
jsonRespText<-content(px_data,as="text")

px_vaesto_kuukausi_vamuu_pxt_119e_kunta <- fromJSONstat(jsonRespText, naming = "label", use_factors = FALSE, silent = FALSE)

save(px_vaesto_kuukausi_vamuu_pxt_119e_kunta, file = "vaesto_kuukausi_vamuu_pxt_119e_kunta.Rdata")
rm(stat_url, px_vaesto_kuukausi_vamuu_pxt_119e_kunta)
load("vaesto_kuukausi_vamuu_pxt_119e_kunta.Rdata")

px_vaesto_kuukausi_vamuu_pxt_119e_kunta <- as_tibble(as.data.frame(px_vaesto_kuukausi_vamuu_pxt_119e_kunta, column.name.type = "text", variable.value.type = "text"))

# #-------------------DATA 2 ------------------
stat_url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/synt/statfin_synt_pxt_12dy.px"

# PXWEB-data-väkiluku
pxweb_query_list <- 
  list("Alue"=valitut_kunnat,
       "Tiedot"=c(
          "vm01",
          "vm11",
          "luonvalisays",
          "vm43_tulo",
          "vm43_lahto",
          "vm43_netto",
          "vm44",
          "vm41",
          "vm41_nordic",
          "vm41_eu",
          "vm42",
          "vm42_nordic",
          "vm42_eu",
          "vm4142",
          "koknetmuutto",
          "vm2126",
          "vm3136",
          "valisays",
          "vakorjaus",
          "kokmuutos"),
       "Vuosi"=c("*"))


# Download data väkiluku
px_statfin_synt_pxt_12dy <- 
  pxweb_get(url = stat_url,
            query = pxweb_query_list)


save(px_statfin_synt_pxt_12dy, file = "statfin_synt_pxt_12dy.Rdata")
rm(stat_url,px_statfin_synt_pxt_12dy7)
load("statfin_synt_pxt_12dy.Rdata")

# # Convert to data.frame väestö
px_data_px_statfin_synt_pxt_12dy <- as_tibble(as.data.frame(px_statfin_synt_pxt_12dy, column.name.type = "text", variable.value.type = "text"))


px_data_px_statfin_synt_pxt_12dy_sub <- subset(px_data_px_statfin_synt_pxt_12dy, select=c("Vuosi","Maahanmuutto Suomeen", "Maahanmuutto Suomeen Pohjoismaista", "Maahanmuutto Suomeen EU-maista", "Nettomaahanmuutto"))

px_data_px_statfin_synt_pxt_12dy_sub <- subset(px_data_px_statfin_synt_pxt_12dy, select=c("Vuosi","Maahanmuutto Suomeen", "Maahanmuutto Suomeen Pohjoismaista", "Maahanmuutto Suomeen EU-maista", "Nettomaahanmuutto"))

px_vaesto_kuukausi_vamuu_pxt_119e_kunta_filter <- filter(px_vaesto_kuukausi_vamuu_pxt_119e_kunta, Tiedot == "Maahanmuutto Suomeen" | Tiedot == "Maahanmuutto Suomeen Pohjoismaista" | Tiedot == "Maahanmuutto Suomeen EU-maista" | Tiedot == "Nettomaahanmuutto")

px_vaesto_kuukausi_vamuu_pxt_119e_kunta_filter_sub <- subset(px_vaesto_kuukausi_vamuu_pxt_119e_kunta_filter, select=c("Kuukausi","Tiedot", "value"))


#Käännetään rivit sarakkeiksi
px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w <- px_vaesto_kuukausi_vamuu_pxt_119e_kunta_filter_sub %>% 
  pivot_wider(
    names_from = Tiedot,
    values_from = value
  )


# #Lasketaan kumulatiivinen kehitys 12kk
px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w$"Maahanmuutto Suomeen kum." <- ave(px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w$"Maahanmuutto Suomeen", FUN=cumsum)
px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w$"Maahanmuutto Suomeen Pohjoismaista kum." <- ave(px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w$"Maahanmuutto Suomeen Pohjoismaista", FUN=cumsum)
px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w$"Maahanmuutto Suomeen EU-maista kum." <- ave(px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w$"Maahanmuutto Suomeen EU-maista", FUN=cumsum)
px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w$"Nettomaahanmuutto kum." <- ave(px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w$"Nettomaahanmuutto", FUN=cumsum)

px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w <- subset(px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w, select=c("Kuukausi","Maahanmuutto Suomeen kum.", "Maahanmuutto Suomeen Pohjoismaista kum.", "Maahanmuutto Suomeen EU-maista kum.", "Nettomaahanmuutto kum."))

px_vaesto_kuukausi_vamuu_pxt_119e_kunta_kum <- tail(px_vaesto_kuukausi_vamuu_pxt_119e_kunta_w, n=1)

#Rename variables väestö
px_vaesto_kuukausi_vamuu_pxt_119e_kunta_kum <- px_vaesto_kuukausi_vamuu_pxt_119e_kunta_kum %>% 
  rename("Vuosi" = "Kuukausi",
         "Maahanmuutto Suomeen" = "Maahanmuutto Suomeen kum.",
         "Maahanmuutto Suomeen Pohjoismaista" = "Maahanmuutto Suomeen Pohjoismaista kum.",
         "Maahanmuutto Suomeen EU-maista" = "Maahanmuutto Suomeen EU-maista kum.",
         "Nettomaahanmuutto" = "Nettomaahanmuutto kum."
         )

df_final <- rbind(px_data_px_statfin_synt_pxt_12dy_sub,
                               px_vaesto_kuukausi_vamuu_pxt_119e_kunta_kum)

# Create JSON and write to standard output
cat(toJSON(df_final, pretty = TRUE))