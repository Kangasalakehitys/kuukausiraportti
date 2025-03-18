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
          "000","001","002","003","004","005","006","007","008","009","010","011","012","013","014","015","016","017","018","019","020","021","022",
    "023","024","025","026","027","028","029","030","031","032","033","034","035","036","037","038","039","040","041","042","043","044","045",
    "046","047","048","049","050","051","052","053","054","055","056","057","058","059","060","061","062","063","064","065","066","067","068",
    "069","070","071","072","073","074","075","076","077","078","079","080","081","082","083","084","085","086","087","088","089","090","091",
    "092","093","094","095","096","097","098","099","100-"
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

px_kunkku_2_14c2_3lk <- fromJSONstat(jsonRespText, naming = "label", use_factors = FALSE, silent = FALSE)

save(px_kunkku_2_14c2_3lk, file = "kunkku_2_14c2_3lk.Rdata")
rm(stat_url, px_kunkku_2_14c2_3lk)
load("kunkku_2_14c2_3lk.Rdata")

#-------------------DATA 2 ------------------
stat_url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11re.px"

valitut_tiedot <- c(
  '000','001','002','003','004','005','006','007','008','009','010','011','012','013','014','015','016','017','018','019','020','021','022',
  '023','024','025','026','027','028','029','030','031','032','033','034','035','036','037','038','039','040','041','042','043','044','045',
  '046','047','048','049','050','051','052','053','054','055','056','057','058','059','060','061','062','063','064','065','066','067','068',
  '069','070','071','072','073','074','075','076','077','078','079','080','081','082','083','084','085','086','087','088','089','090','091',
  '092','093','094','095','096','097','098','099','100-'
  )

# PXWEB-data
pxweb_query_list <- 
  list("Alue"=valitut_kunnat,
       "Ikä"=valitut_tiedot,
       "Sukupuoli"="SSS",
       "Vuosi"=c("*"))

# Download data
px_statfin_vaerak_pxt_11re_lk <- 
  pxweb_get(url = stat_url,
            query = pxweb_query_list)

save(px_statfin_vaerak_pxt_11re_lk, file = "statfin_vaerak_pxt_11re_lk.Rdata")
rm(stat_url,px_statfin_vaerak_pxt_11re_lk)
load("statfin_vaerak_pxt_11re_lk.Rdata")

#-------------------DATA COMBINE ------------------
df_0 <- as_tibble(
                  as.data.frame(
                                px_statfin_vaerak_pxt_11re_lk,
                                column.name.type = "text",
                                variable.value.type = "text"))
df_1 <- px_kunkku_2_14c2_3lk

df_0 <- df_0 %>%
  rename("ika" = "Ikä",
         "arvo" = "Väestö 31.12.")

df_1 <- filter(df_1, Tiedot == "Väkiluku" & Kuukausi == valittu_kk)

df_1 <- df_1 %>% 
  rename("ika" = "Ikä",
         "arvo" = "value",
         "Vuosi" = "Kuukausi")

df_0$ika <- recode(df_0$ika, "100 -" = "100")
df_1$ika <- recode(df_1$ika, "100 -" = "100")

df_0$arvo <- as.numeric(df_0$arvo)
df_1$arvo <- as.numeric(df_1$arvo)
df_0$ika <- as.numeric(df_0$ika)
df_1$ika <- as.numeric(df_1$ika)

df_0 <-  subset(df_0, select = c(Alue, ika, Vuosi, arvo))
df_1 <-  subset(df_1, select = c(Alue, ika, Vuosi, arvo))

df <- rbind(df_0, df_1)

df_0_6 <- filter(df, ika >= 0 & ika <= 6)
df_7_15 <- filter(df, ika >= 7 & ika <= 15)
df_0_15 <- filter(df, ika >= 0 & ika <= 15)
df_0_18 <- filter(df, ika >= 0 & ika <= 18)
df_16_18 <- filter(df, ika >= 16 & ika <= 18)
df_19_64 <- filter(df, ika >= 19 & ika <= 64)
df_16_64 <- filter(df, ika >= 16 & ika <= 64)
df_65_79 <- filter(df, ika >= 65 & ika <= 79)
df_65 <- filter(df, ika >= 65)
df_80 <- filter(df, ika >= 80)
df_yht <- filter(df, ika >= 0)

df_0_6_sum <- df_0_6 %>%
  group_by(Vuosi) %>%
  summarise(ika0_6 = sum(arvo))

df_7_15_sum <- df_7_15 %>%
  group_by(Vuosi) %>%
  summarise(ika7_15 = sum(arvo))

df_0_15_sum <- df_0_15 %>%
  group_by(Vuosi) %>%
  summarise(ika0_15 = sum(arvo))

df_0_18_sum <- df_0_18 %>%
  group_by(Vuosi) %>%
  summarise(ika0_18 = sum(arvo))

df_16_18_sum <- df_16_18 %>%
  group_by(Vuosi) %>%
  summarise(ika16_18 = sum(arvo))

df_19_64_sum <- df_19_64 %>%
  group_by(Vuosi) %>%
  summarise(ika19_64 = sum(arvo))

df_16_64_sum <- df_16_64 %>%
  group_by(Vuosi) %>%
  summarise(ika16_64 = sum(arvo))

df_65_79_sum <- df_65_79 %>%
  group_by(Vuosi) %>%
  summarise(ika65_79 = sum(arvo))

df_65_sum <- df_65 %>%
  group_by(Vuosi) %>%
  summarise(ika65 = sum(arvo))

df_80_sum <- df_80 %>%
  group_by(Vuosi) %>%
  summarise(ika80 = sum(arvo))

df_yht_sum <- df_yht %>%
  group_by(Vuosi) %>%
  summarise(ikayht = sum(arvo))

df_final <- cbind(
  "Vuosi" = df_0_18_sum$Vuosi,
  "Yhteensä" = df_yht_sum$ikayht,
  "0-6" = df_0_6_sum$ika0_6,
  "0-6 %" = round((df_0_6_sum$ika0_6 / df_yht_sum$ikayht) * 100, 2),
  "7-15" = df_7_15_sum$ika7_15,
  "7-15 %" = round((df_7_15_sum$ika7_15 / df_yht_sum$ikayht) * 100, 2),
  "0-15" = df_0_15_sum$ika0_15,
  "0-15 %" = round((df_0_15_sum$ika0_15 / df_yht_sum$ikayht) * 100, 2),
  "0-18" = df_0_18_sum$ika0_18,
  "0-18 %" = round((df_0_18_sum$ika0_18 / df_yht_sum$ikayht) * 100, 2),
  "16-18" = df_16_18_sum$ika16_18,
  "16-18 %" = round((df_16_18_sum$ika16_18 / df_yht_sum$ikayht) * 100, 2),
  "16-64" = df_16_64_sum$ika16_64,
  "16-64 %" = round((df_16_64_sum$ika16_64 / df_yht_sum$ikayht) * 100, 2),
  "19-64" = df_16_64_sum$ika16_64,
  "19-64 %" = round((df_19_64_sum$ika19_64 / df_yht_sum$ikayht) * 100, 2),
  "65-79" = df_65_79_sum$ika65_79,
  "65-79 %" = round((df_65_79_sum$ika65_79 / df_yht_sum$ikayht) * 100, 2),
  "65+" = df_65_sum$ika65,
  "65+ %" = round((df_65_sum$ika65 / df_yht_sum$ikayht) * 100, 2),
  "80+" = df_80_sum$ika80,
  "80+ %" = round((df_80_sum$ika80 / df_yht_sum$ikayht) * 100, 2)
)

# Convert to data.frame
df_final <- as_tibble(
                      as.data.frame(
                                    df_final,
                                    column.name.type = "text",
                                    variable.value.type = "text"))

df_final2 <- melt(
                 df_final,
                 id.vars = c("Vuosi"), 
                 variable.name = "Luokka", 
                 value.name = "Arvo")


# Create JSON and write to standard output
cat(toJSON(df_final2, pretty = TRUE))