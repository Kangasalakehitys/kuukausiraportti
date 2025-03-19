library(tidytext)
library(readr)
library(dplyr)
library(stringr)
library(jsonlite)
library(pxweb)
library(tidyr)

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

#URLIT
stat_url <-
"https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vamuu/statfin_vamuu_pxt_11lj.px"

# PXWEB-data-ennakkorakenne
pxweb_query_list <-
  list("Alue" = valitut_kunnat,
       "Sukupuoli" = "SSS",
       "Ikä" = "SSS",
       "Kuukausi" = "*",
       "Tiedot" = "*")

# Download data
px_statfin_vamuu_pxt_11lj <-
  pxweb_get(url = stat_url,
            query = pxweb_query_list)

data_1 <- px_statfin_vamuu_pxt_11lj

folder <- "/src/data/rdata/"
data_folder <- paste(work_dir, folder, sep = "")
file_name_1 <- "statfin_vamuu_pxt_11lj.Rdata"
directory <- paste(data_folder, file_name_1, sep = "")

save(data_1, file = directory)
rm(stat_url, data_1)
load(directory)

stat_url <-
"https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11re.px"

# PXWEB-data
pxweb_query_list <- 
  list("Alue" = valitut_kunnat,
       "Ikä" = "SSS",
       "Sukupuoli" = "SSS",
       "Vuosi" = c("*"))

# Download data
px_statfin_vaerak_pxt_11re <-
  pxweb_get(url = stat_url,
            query = pxweb_query_list)

data_2 <- px_statfin_vaerak_pxt_11re

folder <- "/src/data/rdata/"
data_folder <- paste(work_dir, folder, sep = "")
file_name_2 <- "statfin_vaerak_pxt_11re.Rdata"
directory <- paste(data_folder, file_name_2, sep = "")

save(data_2, file = directory)
rm(stat_url, data_2)
load(directory)

# Convert to data.frame ennakkorakenne
px_data_erakenne <- as_tibble(as.data.frame(data_1, column.name.type = "text", variable.value.type = "text"))

# Convert to data.frame väestö
px_data_vaesto <- as_tibble(as.data.frame(data_2, column.name.type = "text", variable.value.type = "text"))

#Rename variables väestö
px_data_vaesto <- px_data_vaesto %>% 
  rename("arvo_vakiluku" = "Väestö 31.12.",
         "alue" = "Alue")

px_data_vaesto$cat <- "Väestö"

#Uudelleen nimetään sarakkeet
px_data_erakenne <- px_data_erakenne %>% 
  rename("Vuosi" = "Kuukausi",
         "alue" = "Alue",
         "arvo_vakiluku" = "Väkiluku")

px_data_erakenne$cat <- "Ennakkotieto"


px_data_vaesto_val <- subset(px_data_vaesto, select=c("Vuosi","cat", "arvo_vakiluku"))
px_data_erakenne_val <- subset(px_data_erakenne, select=c("Vuosi","cat", "arvo_vakiluku"))


data_vaesto <- rbind(px_data_vaesto_val,
                     px_data_erakenne_val)

#Tehdään lopullinen aineisto
df_final <- data_vaesto

# Create JSON and write to standard output
cat(toJSON(df_final, pretty = TRUE))