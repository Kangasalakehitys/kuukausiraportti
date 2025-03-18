# Attach libraries (must be installed)

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

stat_url = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/asas/statfin_asas_pxt_13ui.px"

#Valitaan haettavat tiedot
valitut_tiedot <- c(
  "Lkm",
  "lkmmuutos"
)

#Valitaan haettavat tiedot
valitut_talotyypit <- c(
  "SSS",
  "1",
  "2",
  "3",
  "4"
)

#Valitaan haettavat tiedot
valitut_asuntokunnat <- c(
  "SSS",
  "1",
  "2",
  "3",
  "4-"
)

valitut_asuntokunnat_ika <- c(
  "SSS",
  "0-29",
  "30-59",
  "60-",
  "0-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65-74",
  "75-"
)

# PXWEB-data- 
pxweb_query_list <- 
  list("Alue"=valitut_kunnat,
       "Vuosineljännes"="*",
       "Talotyyppi"=valitut_talotyypit,
       "Asuntokunnan koko"=valitut_asuntokunnat,
       "Asuntokunnan vanhimman ikä"=valitut_asuntokunnat_ika,
       "Tiedot"= valitut_tiedot)

# Download data ennakkorakenne
px_statfin_asas_pxt_13ui <- 
  pxweb_get(url = stat_url,
            query = pxweb_query_list)


save(px_statfin_asas_pxt_13ui, file = "statfin_asas_pxt_13ui.Rdata")

rm(stat_url,px_statfin_asas_pxt_13ui)
load("statfin_asas_pxt_13ui.Rdata")

#MUUTA OTSIKOT
title_txt = "Asuntokunnat"
subtitle_txt = ""
title_x = "<b></b>"
title_y = "<b>Lkm</b>"
title_format = "d"
lahde_otsikko = "Lähde:"

# Convert to data.frame väestö
px_asas_pxt_13ui <- as_tibble(as.data.frame(px_statfin_asas_pxt_13ui, column.name.type = "text", variable.value.type = "text"))

cat(toJSON(px_asas_pxt_13ui, pretty = TRUE))