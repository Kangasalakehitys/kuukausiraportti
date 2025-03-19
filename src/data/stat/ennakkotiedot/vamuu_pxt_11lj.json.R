library(tidytext)
library(readr)
library(dplyr)
library(stringr)
library(jsonlite)
library(pxweb)

work_dir <- getwd()

var_folder <- "/src/variables/"
var_data_folder <- paste(work_dir, var_folder, sep = "")
var_file_name <- "variables.R"
var_directory <- paste(var_data_folder, var_file_name, sep = "")

#custom_vars
source(var_directory)

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

maps_folder <- "/src/data/maps/"
maps_data_folder <- paste(work_dir, maps_folder, sep = "")
maps_file_name <- "kunta_maakunta.csv"
maps_directory <- paste(maps_data_folder, maps_file_name, sep = "")

kunta_maakunta_csv <- maps_directory

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

data_1 <- px_statfin_vamuu_pxt_11lj_all

folder <- "/src/data/rdata/"
data_folder <- paste(work_dir, folder, sep = "")
file_name_1 <- "statfin_vamuu_pxt_11lj_all.Rdata"
directory <- paste(data_folder, file_name_1, sep = "")

save(data_1, file = directory)
rm(stat_url, data_1)
load(directory)

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


data_2 <- px_statfin_vaerak_pxt_11re_all

folder <- "/src/data/rdata/"
data_folder <- paste(work_dir, folder, sep = "")
file_name_2 <- "statfin_vaerak_pxt_11re_all"
directory <- paste(data_folder, file_name_2, sep = "")

save(data_2, file = directory)
rm(stat_url, data_2)
load(directory)

# Convert to data.frame ennakkorakenne
px_data_erakenne <- as_tibble(as.data.frame(
                                            data_1,
                                            column.name.type = "text",
                                            variable.value.type = "text"))


# Convert to data.frame väestö
px_data_vaesto <- as_tibble(as.data.frame(
                                          data_2,
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

csv_folder <- "/src/data/"
csv_data_folder <- paste(work_dir, csv_folder, sep = "")
folder_data <- csv_data_folder
folder_file_data <- paste(folder_data, filename_data, sep = "")

write.csv(df_final, folder_file_data, row.names = FALSE)

# Create JSON and write to standard output
cat(toJSON(df_final, pretty = TRUE))