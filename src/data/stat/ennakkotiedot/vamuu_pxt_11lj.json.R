library(tidytext)
library(readr)
library(dplyr)
library(stringr)
library(jsonlite)
library(pxweb)

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

kunta_maakunta_csv <- "C:/Users/kanga/Documents/Observable/testi/src/data/maps/kunta_maakunta.csv"

kuntaid_maakuntaid <- read.csv(
                               kunta_maakunta_csv,
                               header = TRUE,
                               colClasses = c(
                                 "character",
                                 "character",
                                 "character",
                                 "character",
                                 "character",
                                 "character",
                                 "character",
                                 "character",
                                 "character"
                               ))

#Uudelleen nimetään sarakkeet
kuntaid_maakuntaid <- kuntaid_maakuntaid %>%
  rename("Alue" = "nimi")

#URLIT
stat_url <-
"https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vamuu/statfin_vamuu_pxt_11lj.px"

# PXWEB-data-ennakkorakenne
pxweb_query_list <-
  list("Alue" = "*",
       "Sukupuoli" = "SSS",
       "Ikä" = "SSS",
       "Kuukausi" = "*",
       "Tiedot" = "*")

# Download data
px_statfin_vamuu_pxt_11lj_all <-
  pxweb_get(url = stat_url,
            query = pxweb_query_list)

save(px_statfin_vamuu_pxt_11lj_all, file = "statfin_vamuu_pxt_11lj_all.Rdata")
rm(stat_url, px_statfin_vamuu_pxt_11lj_all)
load("statfin_vamuu_pxt_11lj_all.Rdata")

stat_url <-
"https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11re.px"

# PXWEB-data
pxweb_query_list <-
  list("Alue" = "*",
       "Ikä" = "SSS",
       "Sukupuoli" = "SSS",
       "Vuosi" = c("*"),
       "Tiedot" = "*")

# Download data
px_statfin_vaerak_pxt_11re_all <-
  pxweb_get(url = stat_url,
            query = pxweb_query_list)

save(px_statfin_vaerak_pxt_11re_all, file = "statfin_vaerak_pxt_11re_all.Rdata")
rm(stat_url,px_statfin_vaerak_pxt_11re_all)
load("statfin_vaerak_pxt_11re_all.Rdata")

# Convert to data.frame väestö
px_data_vaesto <- as_tibble(as.data.frame(
                                          px_statfin_vaerak_pxt_11re_all,
                                          column.name.type = "text",
                                          variable.value.type = "text"))
# Convert to data.frame ennakkorakenne
px_data_erakenne <- as_tibble(as.data.frame(
                                            px_statfin_vamuu_pxt_11lj_all,
                                            column.name.type = "text",
                                            variable.value.type = "text"))

# Suodatetaan koko maa pois ja haetaan uusimmat arvot
px_data_vaesto_last_year <-
  filter(px_data_vaesto, Alue != "KOKO MAA" & Vuosi == vuosi)
px_data_erakenne_last_year <-
  filter(px_data_erakenne, Alue != "KOKO MAA" & Kuukausi == valittu_kk)

#Uudelleen nimetään sarakkeet
px_data_erakenne_last_year <- px_data_erakenne_last_year %>%
  rename("Ennakkotieto" = "Väkiluku")

df_final_0 <-
  merge(px_data_erakenne_last_year, px_data_vaesto_last_year, by = "Alue")

df_final_1 <-
  merge(df_final_0, kuntaid_maakuntaid, by = "Alue")

#Valitaan tarkisteltavat kentät raporttiin
df_final <- cbind("id" = df_final_1$kunta,
  "Kunta" = df_final_1$Alue,
  "maakunta_id" = df_final_1$maakunta,
  "Maakunta" = df_final_1$nimi_2,
  "Väestö 31.12." = df_final_1$"Väestö 31.12.",
  "Ennakkotieto" = df_final_1$"Ennakkotieto",
  "muutos" = round(((
                     df_final_1$"Ennakkotieto" -
                       df_final_1$"Väestö 31.12.") /
    df_final_1$"Väestö 31.12.") * 100, 2)
)

# Convert to data.frame ennakkorakenne
df_final <- as_tibble(
                      as.data.frame(
                                    df_final,
                                    column.name.type = "text",
                                    variable.value.type = "text"))

# Convert to data.frame ennakkorakenne
df_final <- as_tibble(
                      as.data.frame(df_final,
                                    column.name.type = "text",
                                    variable.value.type = "text"))

df_final$muutos <- as.numeric(df_final$muutos)

df_final <- df_final %>% filter(!is.na(df_final$muutos))

df_final <- df_final[order(df_final$muutos, decreasing = TRUE), ]

#Haetaan domainiin min ja max arvot
domain_max <- max(df_final$muutos)
domain_min <- min(df_final$muutos)
domain_med <- median(df_final$muutos)
domain_avg <- round(mean(df_final$muutos), 1)

k1_nimi_lower <- tolower(k1_nimi)

filename_data_0 <- "population_map.csv"
filename_data <- paste(k1_nimi_lower, filename_data_0, sep = "_")
folder_data <- "C:/Users/kanga/Documents/Observable/testi/src/data/"

folder_file_data <- paste(folder_data, filename_data, sep = "")

write.csv(df_final, folder_file_data, row.names = FALSE)

# Create JSON and write to standard output
cat(toJSON(df_final, pretty = TRUE))