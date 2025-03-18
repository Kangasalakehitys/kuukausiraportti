library(tidytext)
library(readr)
library(dplyr)
library(stringr)
library(jsonlite)
library(pxweb)
library(httr)
library(rjstat)

source("C:/Users/kanga/Documents/Observable/testi/src/variables/variables.R")

vuosi <- custom_vars(3)
valittu_kk <- paste(custom_vars(2), "*", sep = "")
kunta <- custom_vars(1)
k1_KU <- paste("KU", kunta, sep = "")
valitut_kunnat <- c(k1_KU)
k1_nimi <- custom_vars(5)
k1_maakunta <- custom_vars(5)

#MUUTA OTSIKOT
title_txt <- "Väestökehitys nettomuutto viim. 12kk"
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



#***************************DATA 1***************************
#URLIT
stat_url = "https://pxhopea2.stat.fi:443/PXWeb/api/v1/fi/Kuntien_ennakkotiedot/Kuntien_ennakkotiedot_2025/vaesto_kuukausi_vamuu_pxt_119e.px"

#SALASANA JA KÄYTTÄJÄTUNNUS TILASTO
api_username_stat = "V2144"
api_password_stat = "3682"

headers = c(
  'un' = api_username_stat,
  'pw' = api_password_stat,
  'Content-Type' = 'application/json'
)
#KU588 Pertunmaa otettu pois 2025
#MUUTA PIENALUENUMEROT, JOITA HALUAT TARKISTELLA SEKÄ VUODET
body = '{
  "query": [
    {
      "code": "Alue",
      "selection": {
        "filter": "item",
        "values": [
          "SSS",
          "KU020",
          "KU005",
          "KU009",
          "KU010",
          "KU016",
          "KU018",
          "KU019",
          "KU035",
          "KU043",
          "KU046",
          "KU047",
          "KU049",
          "KU050",
          "KU051",
          "KU052",
          "KU060",
          "KU061",
          "KU062",
          "KU065",
          "KU069",
          "KU071",
          "KU072",
          "KU074",
          "KU075",
          "KU076",
          "KU077",
          "KU078",
          "KU079",
          "KU081",
          "KU082",
          "KU086",
          "KU111",
          "KU090",
          "KU091",
          "KU097",
          "KU098",
          "KU102",
          "KU103",
          "KU105",
          "KU106",
          "KU108",
          "KU109",
          "KU139",
          "KU140",
          "KU142",
          "KU143",
          "KU145",
          "KU146",
          "KU153",
          "KU148",
          "KU149",
          "KU151",
          "KU152",
          "KU165",
          "KU167",
          "KU169",
          "KU170",
          "KU171",
          "KU172",
          "KU176",
          "KU177",
          "KU178",
          "KU179",
          "KU181",
          "KU182",
          "KU186",
          "KU202",
          "KU204",
          "KU205",
          "KU208",
          "KU211",
          "KU213",
          "KU214",
          "KU216",
          "KU217",
          "KU218",
          "KU224",
          "KU226",
          "KU230",
          "KU231",
          "KU232",
          "KU233",
          "KU235",
          "KU236",
          "KU239",
          "KU240",
          "KU320",
          "KU241",
          "KU322",
          "KU244",
          "KU245",
          "KU249",
          "KU250",
          "KU256",
          "KU257",
          "KU260",
          "KU261",
          "KU263",
          "KU265",
          "KU271",
          "KU272",
          "KU273",
          "KU275",
          "KU276",
          "KU280",
          "KU284",
          "KU285",
          "KU286",
          "KU287",
          "KU288",
          "KU290",
          "KU291",
          "KU295",
          "KU297",
          "KU300",
          "KU301",
          "KU304",
          "KU305",
          "KU312",
          "KU316",
          "KU317",
          "KU318",
          "KU398",
          "KU399",
          "KU400",
          "KU407",
          "KU402",
          "KU403",
          "KU405",
          "KU408",
          "KU410",
          "KU416",
          "KU417",
          "KU418",
          "KU420",
          "KU421",
          "KU422",
          "KU423",
          "KU425",
          "KU426",
          "KU444",
          "KU430",
          "KU433",
          "KU434",
          "KU435",
          "KU436",
          "KU438",
          "KU440",
          "KU441",
          "KU475",
          "KU478",
          "KU480",
          "KU481",
          "KU483",
          "KU484",
          "KU489",
          "KU491",
          "KU494",
          "KU495",
          "KU498",
          "KU499",
          "KU500",
          "KU503",
          "KU504",
          "KU505",
          "KU508",
          "KU507",
          "KU529",
          "KU531",
          "KU535",
          "KU536",
          "KU538",
          "KU541",
          "KU543",
          "KU545",
          "KU560",
          "KU561",
          "KU562",
          "KU563",
          "KU564",
          "KU309",
          "KU576",
          "KU577",
          "KU578",
          "KU445",
          "KU580",
          "KU581",
          "KU599",
          "KU583",
          "KU854",
          "KU584",
          "KU592",
          "KU593",
          "KU595",
          "KU598",
          "KU601",
          "KU604",
          "KU607",
          "KU608",
          "KU609",
          "KU611",
          "KU638",
          "KU614",
          "KU615",
          "KU616",
          "KU619",
          "KU620",
          "KU623",
          "KU624",
          "KU625",
          "KU626",
          "KU630",
          "KU631",
          "KU635",
          "KU636",
          "KU678",
          "KU710",
          "KU680",
          "KU681",
          "KU683",
          "KU684",
          "KU686",
          "KU687",
          "KU689",
          "KU691",
          "KU694",
          "KU697",
          "KU698",
          "KU700",
          "KU702",
          "KU704",
          "KU707",
          "KU729",
          "KU732",
          "KU734",
          "KU736",
          "KU790",
          "KU738",
          "KU739",
          "KU740",
          "KU742",
          "KU743",
          "KU746",
          "KU747",
          "KU748",
          "KU791",
          "KU749",
          "KU751",
          "KU753",
          "KU755",
          "KU758",
          "KU759",
          "KU761",
          "KU762",
          "KU765",
          "KU766",
          "KU768",
          "KU771",
          "KU777",
          "KU778",
          "KU781",
          "KU783",
          "KU831",
          "KU832",
          "KU833",
          "KU834",
          "KU837",
          "KU844",
          "KU845",
          "KU846",
          "KU848",
          "KU849",
          "KU850",
          "KU851",
          "KU853",
          "KU857",
          "KU858",
          "KU859",
          "KU886",
          "KU887",
          "KU889",
          "KU890",
          "KU892",
          "KU893",
          "KU895",
          "KU785",
          "KU905",
          "KU908",
          "KU092",
          "KU915",
          "KU918",
          "KU921",
          "KU922",
          "KU924",
          "KU925",
          "KU927",
          "KU931",
          "KU934",
          "KU935",
          "KU936",
          "KU941",
          "KU946",
          "KU976",
          "KU977",
          "KU980",
          "KU981",
          "KU989",
          "KU992"
        ]
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
}'

px_data <- VERB("POST", url = stat_url, body = body, add_headers(headers))

# Shows raw data which is not structured and readable
jsonRespText<-content(px_data,as="text")

px_vaesto_kuukausi_vamuu_pxt_119e <- fromJSONstat(jsonRespText, naming = "label", use_factors = FALSE, silent = FALSE)

save(px_vaesto_kuukausi_vamuu_pxt_119e, file = "vaesto_kuukausi_vamuu_pxt_119e.Rdata")

rm(stat_url,px_vaesto_kuukausi_vamuu_pxt_119e)

load("vaesto_kuukausi_vamuu_pxt_119e.Rdata")

#***************************DATA 2***************************
#URLIT
stat_url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/muutl/statfin_muutl_pxt_12w7.px"

valitut_tiedot <- c("vm43_netto")

kuukaudet <- c("2022M01","2022M02","2022M03","2022M04","2022M05","2022M06","2022M07","2022M08","2022M09","2022M10","2022M11","2022M12","2023M01",
"2023M02","2023M03","2023M04","2023M05","2023M06","2023M07","2023M08","2023M09","2023M10","2023M11","2023M12")

# valitut_tiedot <- c(
#           "vm01",
#           "vm11",
#           "luonvalisays",
#           "vm43_tulo",
#           "vm43_lahto",
#           "vm43_netto",
#           "vm44",
#           "vm41",
#           "vm41_nordic",
#           "vm41_eu",
#           "vm42",
#           "vm42_nordic",
#           "vm42_eu",
#           "vm4142",
#           "koknetmuutto",
#           "valisays",
#           "vakorjaus",
#           "kokmuutos",
#           "vaesto")
# 0	"Elävänä syntyneet"
# 1	"Kuolleet"
# 2	"Luonnollinen väestönlisäys"
# 3	"Kuntien välinen tulomuutto"
# 4	"Kuntien välinen lähtömuutto"
# 5	"Kuntien välinen nettomuutto"
# 6	"Kunnan sisäinen muutto"
# 7	"Maahanmuutto Suomeen"
# 8	"Maahanmuutto Suomeen Pohjoismaista"
# 9	"Maahanmuutto Suomeen EU-maista"
# 10	"Maastamuutto Suomesta"
# 11	"Maastamuutto Suomesta Pohjoismaihin"
# 12	"Maastamuutto Suomesta EU-maihin"
# 13	"Nettomaahanmuutto"
# 14	"Kokonaisnettomuutto"
# 15	"Solmitut avioliitot"
# 16	"Avioerot"
# 17	"Väestönlisäys"
# 18	"Väkiluvun korjaus"
# 19	"Kokonaismuutos"
# 20	"Väkiluku"

# PXWEB-data
pxweb_query_list <- 
  list("Alue"=c("*"),
       "Tiedot"=valitut_tiedot,
       "Kuukausi"=kuukaudet)

# Download data
px_statfin_muutl_pxt_12w7 <- 
  pxweb_get(url = stat_url,
            query = pxweb_query_list)


save(px_statfin_muutl_pxt_12w7, file = "statfin_muutl_pxt_12w7.Rdata")

rm(stat_url,px_statfin_muutl_pxt_12w7)
load("statfin_muutl_pxt_12w7.Rdata")


#***************************DATA HANDLING 1 and 2 ***************************

# Convert to data.frame väestö
px_data_vaesto_kuukausi_vamuu_pxt_119e <- as_tibble(as.data.frame(px_vaesto_kuukausi_vamuu_pxt_119e, column.name.type = "text", variable.value.type = "text"))

px_data_vaesto_kuukausi_vamuu_pxt_119e_filter <- filter(px_data_vaesto_kuukausi_vamuu_pxt_119e, Alue != "KOKO MAA" & Tiedot=="Kuntien välinen nettomuutto")

#Muutetaan sarakkeen nimiä
px_data_vaesto_kuukausi_vamuu_pxt_119e_filter <- px_data_vaesto_kuukausi_vamuu_pxt_119e_filter %>% 
  rename("Kuntien välinen nettomuutto" = "value")

df_data_vaesto_kuukausi_vamuu_pxt_119e_filter <- subset(px_data_vaesto_kuukausi_vamuu_pxt_119e_filter, select=c("Alue", "Kuukausi","Kuntien välinen nettomuutto"))

# Convert to data.frame väestö
px_data_statfin_muutl_pxt_12w7 <- as_tibble(as.data.frame(px_statfin_muutl_pxt_12w7, column.name.type = "text", variable.value.type = "text"))
px_data_statfin_muutl_pxt_12w7_filter <- filter(px_data_statfin_muutl_pxt_12w7, Alue != "KOKO MAA")
df_data_statfin_muutl_pxt_12w7 <- subset(px_data_statfin_muutl_pxt_12w7_filter, select=c("Alue", "Kuukausi","Kuntien välinen nettomuutto"))

#Yhdistetään aikasarja
df_yhdistelma <- rbind(df_data_statfin_muutl_pxt_12w7,df_data_vaesto_kuukausi_vamuu_pxt_119e_filter)

df_yhdistelma_0 <- merge(df_yhdistelma,kuntaid_maakuntaid, by="Alue")

#Valitaan tarkisteltavat kentät raporttiin
df_yhdistelma_00 <- cbind("id" = df_yhdistelma_0$kunta,
                  "Kunta" = df_yhdistelma_0$Alue,
                  "Kuukausi" = df_yhdistelma_0$Kuukausi,
                  "maakunta_id" = df_yhdistelma_0$maakunta,
                  "Maakunta" = df_yhdistelma_0$nimi_2,
                  "Kuntien välinen nettomuutto" = df_yhdistelma_0$"Kuntien välinen nettomuutto"
)

df_yhdistelma_000 <- as_tibble(as.data.frame(df_yhdistelma_00, column.name.type = "text", variable.value.type = "text"))

#Muokataan kuukausidataa, poistetaan ennakko * ja kaikki erikoismerkit
df_yhdistelma_000$"Kuukausi" <- gsub('[^[:alnum:] ]','',df_yhdistelma_000$"Kuukausi")
df_yhdistelma_000$"Kuukausi" <- gsub("M", "-", df_yhdistelma_000$"Kuukausi")

#Järjestetään data
df_yhdistelma_000 <- df_yhdistelma_000[order(df_yhdistelma_000$"Kunta", df_yhdistelma_000$"Kuukausi"),]

# df_yhdistelma$"Kuukausi" <- format(df_yhdistelma$"Kuukausi", format = "%Y %m")
# df_yhdistelma$"Kuukausi" <- gsub("*[[:alnum:]]+", "", df_yhdistelma$"Kuukausi")

kaupunki <- filter(df_yhdistelma_000, Kunta == "Kangasala")
#haetaan viimeiset 12kk
viimeiset_12_kk <- kaupunki$"Kuukausi" %>% tail(12)
uusin_kk <- kaupunki$"Kuukausi" %>% tail(1)
uusin_kk <- as.Date(paste(uusin_kk, "-01", sep=""))
#Viimeinen käsiteltävä kuukausi
viimeinen_12_kk <-  viimeiset_12_kk[length(viimeiset_12_kk) - 11]
viimeinen_12_kk <- as.Date(paste(viimeinen_12_kk, "-01", sep=""))

#Muutetaan päiväksi
df_yhdistelma_000$"Kuukausi" <- as.Date(paste(df_yhdistelma_000$"Kuukausi", "-01", sep=""))

#Haetaan data 12kk väliltä
df_final <- subset(df_yhdistelma_000, df_yhdistelma_000$"Kuukausi">= viimeinen_12_kk & df_yhdistelma_000$"Kuukausi" <= uusin_kk)

#Lasketaan kumulatiivinen kehitys 12kk
df_final$cum_sum <- ave(df_final$"Kuntien välinen nettomuutto", df_final$"Kunta", FUN=cumsum)

#Muokataan nimet
df_final <- df_final %>% 
  rename("muutos" = "cum_sum"
  )

df_final$muutos <- as.numeric(df_final$muutos)

#Poimitaan vain viimeisin kuukausi
df_final <- filter(df_final, Kuukausi == uusin_kk)

df_final <- df_final[order(df_final$"muutos", decreasing = TRUE),]



cat(toJSON(df_final, pretty = TRUE))