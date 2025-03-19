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
valittu_kk <- paste(custom_vars(2))
kunta <- custom_vars(1)
k1_KU <- paste("KU", kunta, sep = "")
valitut_kunnat <- c(k1_KU)
k1_nimi <- custom_vars(5)
k1_maakunta <- custom_vars(5)

#MUUTA OTSIKOT
title_txt <- "Työttömien työnhakijoiden %-osuus työvoimasta koko maassa"
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

#URLIT
stat_url = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/tyonv/statfin_tyonv_pxt_12r5.px"

#Valitaan haettavat tiedot
valitut_tiedot <- c(
  "TYOTOSUUS"
)

#588 Pertunmaa poistettu 2025

#Valitaan haettavat tiedot
valitut_kunnat <- c(
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
)


# PXWEB-data- 
pxweb_query_list <- 
  list("Alue"=valitut_kunnat,
       "Kuukausi"="*",
       "Tiedot"= valitut_tiedot)

# Download data ennakkorakenne
px_statfin_tyonv_pxt_12r5_map <- 
  pxweb_get(url = stat_url,
            query = pxweb_query_list)


data_1 <- px_statfin_tyonv_pxt_12r5_map

folder <- "/src/data/rdata/"
data_folder <- paste(work_dir, folder, sep = "")
file_name_1 <- "statfin_tyonv_pxt_12r5_map.Rdata"
directory <- paste(data_folder, file_name_1, sep = "")

save(data_1, file = directory)
rm(stat_url, data_1)
load(directory)


#Uudelleen nimetään sarakkeet
kuntaid_maakuntaid <- kuntaid_maakuntaid %>% 
  rename("Alue" = "nimi")


# Convert to data.frame väestö
px_data_tem <- as_tibble(as.data.frame(data_1, column.name.type = "text", variable.value.type = "text"))

# Suodatetaan koko maa pois ja haetaan uusimmat arvot
px_data_tem <- filter(px_data_tem, Kuukausi == valittu_kk)


df_final_1 <- merge(px_data_tem,kuntaid_maakuntaid, by="Alue")

#Valitaan tarkisteltavat kentät raporttiin
df_final_0 <- cbind("id" = df_final_1$kunta,
                    "Kunta" = df_final_1$Alue,
                    "Kuukausi" = df_final_1$Kuukausi,
                    "maakunta_id" = df_final_1$maakunta,
                    "Maakunta" = df_final_1$nimi_2,
                    "muutos" = df_final_1$"Työttömien työnhakijoiden %-osuus työvoimasta (%)"
)


# Convert to data.frame ennakkorakenne
df_final_0 <- as_tibble(as.data.frame(df_final_0, column.name.type = "text", variable.value.type = "text"))

df_final_0$muutos <- as.numeric(df_final_0$muutos)

df_final_0 <- df_final_0 %>% filter(!is.na(df_final_0$muutos))

df_final_0 <- df_final_0[order(df_final_0$muutos, decreasing = TRUE),]

#Haetaan domainiin min ja max arvot
domain_max <- max(df_final_0$muutos)
domain_min <- min(df_final_0$muutos)
domain_med <- median(df_final_0$muutos)
domain_avg <- round(mean(df_final_0$muutos), 1)

df_final <- df_final_0

k1_nimi_lower <- tolower(k1_nimi)
filename_data_0 <- "tyollisyys_pro_map.csv"
filename_data <- paste(k1_nimi_lower, filename_data_0, sep = "_")

csv_folder <- "/src/data/"
csv_data_folder <- paste(work_dir, csv_folder, sep = "")
folder_data <- csv_data_folder
folder_file_data <- paste(folder_data, filename_data, sep = "")

write.csv(df_final, folder_file_data, row.names = FALSE)

# Create JSON and write to standard output
cat(toJSON(df_final, pretty = TRUE))