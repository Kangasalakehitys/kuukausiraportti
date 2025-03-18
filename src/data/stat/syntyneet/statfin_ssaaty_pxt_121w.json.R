library(tidytext)
library(readr)
library(dplyr)
library(stringr)
library(jsonlite)
library(pxweb)
library(tidyr)

source("C:/Users/kanga/Documents/Observable/testi/src/variables/variables.R")

vuosi <- custom_vars(3)
valittu_kk <- paste(custom_vars(2), "*", sep = "")
kunta <- custom_vars(1)
k1_KU <- paste("KU", kunta, sep = "")
valitut_kunnat <- c(k1_KU)
k1_nimi <- custom_vars(5)
k1_maakunta <- custom_vars(5)

#MUUTA OTSIKOT
title_txt <- "Väkiluvun muutos-% vuoden 2023 lopusta"
subtitle_txt <- ""
title_x <- "<b></b>"
title_y <- "<b>Lkm</b>"
title_format <- "d"
lahde_otsikko <- "Lähde:"

#URLIT
stat_url <-
"https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/ssaaty/statfin_ssaaty_pxt_121w.px"

# PXWEB-data-ennakkorakenne
pxweb_query_list <- 
  list("Alue"=valitut_kunnat,
       "Vuosi"=c("*"),
       "Tiedot"="*")

# Download data ennakkorakenne
px_statfin_ssaaty_pxt_121w <- 
  pxweb_get(url = stat_url,
            query = pxweb_query_list)


save(px_statfin_ssaaty_pxt_121w, file = "statfin_ssaaty_pxt_121w.Rdata")

rm(stat_url,px_statfin_ssaaty_pxt_121w)
load("statfin_ssaaty_pxt_121w.Rdata")


stat_url <-
"https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/vamuu/statfin_vamuu_pxt_11lk.px"

# PXWEB-data-ennakkorakenne
pxweb_query_list <- 
  list("Alue"=valitut_kunnat,
       "Vuosineljännes"=c("*"),
       "Tiedot"="*")

# Download data ennakkorakenne
px_statfin_vamuu_pxt_11lk <- 
  pxweb_get(url = stat_url,
            query = pxweb_query_list)


save(px_statfin_vamuu_pxt_11lk, file = "statfin_vamuu_pxt_11lk.Rdata")

rm(stat_url,px_statfin_vamuu_pxt_11lk)
load("statfin_vamuu_pxt_11lk.Rdata")



# Convert to data.frame väestö
px_data_muutokset_syntyneet <- as_tibble(as.data.frame(px_statfin_ssaaty_pxt_121w, column.name.type = "text", variable.value.type = "text"))
# Convert to data.frame väestö
px_data_muutokset_ennakko_syntyneet <- as_tibble(as.data.frame(px_statfin_vamuu_pxt_11lk, column.name.type = "text", variable.value.type = "text"))

#Rename variables väestö
px_data_muutokset_syntyneet <- px_data_muutokset_syntyneet %>% 
  rename("arvo" = "Elävänä syntyneet",
         "alue" = "Alue")

px_data_muutokset_syntyneet$cat <- "Syntyneet"
px_data_muutokset_syntyneet$sum <- px_data_muutokset_syntyneet$arvo

#Uudelleen nimetään sarakkeet
px_data_muutokset_ennakko_syntyneet <- px_data_muutokset_ennakko_syntyneet %>% 
  rename("Vuosi" = "Vuosineljännes",
         "alue" = "Alue",
         "arvo" = "Elävänä syntyneet")

px_data_muutokset_ennakko_syntyneet$cat <- "Ennakkotieto"
px_data_muutokset_ennakko_syntyneet$sum <- ""

px_data_muutokset_syntyneet_val <- subset(px_data_muutokset_syntyneet, select=c("Vuosi","cat", "arvo", "sum"))
px_data_muutokset_ennakko_syntyneet_val <- subset(px_data_muutokset_ennakko_syntyneet, select=c("Vuosi","cat", "arvo", "sum"))

#Lasketaankvartaalien summa
px_data_muutokset_ennakko_syntyneet_val$sum <- cumsum(px_data_muutokset_ennakko_syntyneet_val$arvo)


data_vaesto_syntyneet <- rbind(px_data_muutokset_syntyneet_val,
                               px_data_muutokset_ennakko_syntyneet_val)

df_final <- data_vaesto_syntyneet

df_final$sum <- as.integer(df_final$sum)

# Create JSON and write to standard output
cat(toJSON(df_final, pretty = TRUE))