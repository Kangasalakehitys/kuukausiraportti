# Attach libraries (must be installed)

library(tidytext)
library(readr)
library(dplyr)
library(stringr)
library(jsonlite)
library(pxweb)

stat_url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11re.px"

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

data_1 <- px_statfin_vaerak_pxt_11re_all

work_dir <- getwd()
folder <- "/src/data/rdata/"
data_folder <- paste(work_dir, folder, sep = "")
file_name_1 <- "statfin_vaerak_pxt_11re_all.Rdata"
directory <- paste(data_folder, file_name_1, sep = "")

save(data_1, file = directory)
rm(stat_url, data_1)
load(directory)
