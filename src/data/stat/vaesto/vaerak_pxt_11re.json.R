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


save(px_statfin_vaerak_pxt_11re_all, file = "statfin_vaerak_pxt_11re_all.Rdata")

rm(stat_url,px_statfin_vaerak_pxt_11re_all)