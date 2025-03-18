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
#Haettava tieto - Tilastokeskuksen url
stat_url = "https://pxhopea2.stat.fi:443/PXWeb/api/v1/fi/Kuntien_ennakkotiedot/Kuntien_ennakkotiedot_2025/kunkku_2_14c2.px"

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
        "values": ["'
  body1 = valitut_kunnat
  body2 = '"]
      }
    },
    {
      "code": "Ikä",
      "selection": {
        "filter": "item",
        "values": [
          "SSS"
        ]
      }
    },
    {
      "code": "Sukupuoli",
      "selection": {
        "filter": "item",
        "values": [
          "SSS"
        ]
      }
    }
  ],
  "response": {
    "format": "json-stat2"
  }
}';
  
body = paste(body0,body1,body2,sep="")

px_data <- VERB("POST", url = stat_url, body = body, add_headers(headers))

# Shows raw data which is not structured and readable
jsonRespText<-content(px_data,as="text")

px_kunkku_2_14c2 <- fromJSONstat(jsonRespText, naming = "label", use_factors = FALSE, silent = FALSE)

save(px_kunkku_2_14c2, file = "kunkku_2_14c2.Rdata")
rm(stat_url, px_kunkku_2_14c2)
load("kunkku_2_14c2.Rdata")

#-------------------DATA 2 ------------------
stat_url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11rm.px"


# PXWEB-data-väkiluku
pxweb_query_list <- 
  list("Alue"=valitut_kunnat,
       "Kieli"=c("SSS","02"),
       "Sukupuoli"="SSS",
       "Vuosi"=c("*"))


# Download data väkiluku
px_statfin_vaerak_pxt_11rm <- 
  pxweb_get(url = stat_url,
            query = pxweb_query_list)


save(px_statfin_vaerak_pxt_11rm, file = "statfin_vaerak_pxt_11rm.Rdata")
rm(stat_url,px_data_statfin_vaerak_pxt_11rm)
load("statfin_vaerak_pxt_11rm.Rdata")


# Convert to data.frame väestö
px_data_kunkku_2_14c2 <- as_tibble(as.data.frame(px_kunkku_2_14c2, column.name.type = "text", variable.value.type = "text"))

px_data_kunkku_2_14c2_filter <- px_data_kunkku_2_14c2

#Käännetään rivit sarakkeiksi
px_data_kunkku_2_14c2_filter_w <- px_data_kunkku_2_14c2_filter %>% 
  pivot_wider(
    names_from = Tiedot,
    values_from = value
  )

px_data_statfin_vaerak_pxt_11rm <- as_tibble(as.data.frame(px_statfin_vaerak_pxt_11rm, column.name.type = "text", variable.value.type = "text"))

#Käännetään rivit sarakkeiksi
px_data_statfin_vaerak_pxt_11rm_w <- px_data_statfin_vaerak_pxt_11rm %>% 
  pivot_wider(
    names_from = Kieli,
    values_from = `Väestö 31.12.`
  )


df_statfin_vaerak_pxt_11rm_w <- subset(px_data_statfin_vaerak_pxt_11rm_w, select=c("Vuosi","Yhteensä", "VIERASKIELISET YHTEENSÄ"))

df_kunkku_2_14c2_filter_w  <- subset(px_data_kunkku_2_14c2_filter_w, select=c("Kuukausi","Väkiluku", "Vieraskieliset ja saame"))

df_statfin_vaerak_pxt_11rm_w  <- df_statfin_vaerak_pxt_11rm_w  %>% 
  rename("Vieraskieliset" = "VIERASKIELISET YHTEENSÄ")

df_kunkku_2_14c2_filter_w  <- df_kunkku_2_14c2_filter_w  %>% 
  rename("Vieraskieliset" = "Vieraskieliset ja saame",
         "Yhteensä" = "Väkiluku",
         "Vuosi" = "Kuukausi")

df_final_0 <- rbind(df_statfin_vaerak_pxt_11rm_w,
                    df_kunkku_2_14c2_filter_w)

df_final_0$muutos <- round((df_final_0$"Vieraskieliset"/df_final_0$"Yhteensä")*100,1)

df_final <- df_final_0



# Create JSON and write to standard output
cat(toJSON(df_final, pretty = TRUE))