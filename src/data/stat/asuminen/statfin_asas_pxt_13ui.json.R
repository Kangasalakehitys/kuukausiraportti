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
  list("Alue" = valitut_kunnat,
       "Vuosineljännes" = "*",
       "Talotyyppi" = valitut_talotyypit,
       "Asuntokunnan koko" = valitut_asuntokunnat,
       "Asuntokunnan vanhimman ikä" = valitut_asuntokunnat_ika,
       "Tiedot" = valitut_tiedot)

# Download data ennakkorakenne
px_statfin_asas_pxt_13ui <- 
  pxweb_get(url = stat_url,
            query = pxweb_query_list)

data_1 <- px_statfin_asas_pxt_13ui

# folder <- "/src/data/rdata/"
# data_folder <- paste(work_dir, folder, sep = "")
# file_name_1 <- "statfin_asas_pxt_13ui.Rdata"
# directory <- paste(data_folder, file_name_1, sep = "")

# save(data_1, file = directory)
# rm(stat_url, data_1)
# load(directory)

# Convert to data.frame väestö
data <- as_tibble(as.data.frame(data_1, column.name.type = "text", variable.value.type = "text"))

cat(toJSON(data, pretty = TRUE))