library(tidytext)
library(readr)
library(dplyr)
library(stringr)
library(jsonlite)
library(pxweb)
library(lubridate)
library(ElevDistr)
library(data.table)
library(tidyr)

#Check years
vuodet <- c("22", "23", "24", "25")
length_vuodet <- length(vuodet)

source("C:/Users/kanga/Documents/Observable/testi/src/variables/variables.R")

vuosi <- custom_vars(3)
valittu_kk <- paste(custom_vars(2))
kunta <- custom_vars(1)
k1 <- kunta
k1_KU <- paste("KU", kunta, sep = "")
valitut_kunnat <- c(k1_KU)
k1_nimi <- custom_vars(5)
k1_maakunta <- custom_vars(5)

  #MUUTA OTSIKOT
  title_txt = "Liikennemäärät"
  subtitle_txt = ""
  title_x = "<b></b>"
  title_y = "<b>Lkm</b>"
  title_format = "d"
  lahde_otsikko = "Lähde:"

paiva_nro <- yday(today() - 3)
today <- format(today() - 3, format = "%m-%d")


lam_kunnat <- "C://Users//kanga//Documents//Observable//testi//src//data//liikenne//lam_kunnat.csv"
kunta_center <- "C://Users//kanga//Documents//Observable//testi//src//data//liikenne//kunta_center.csv"

# Get content into a data frame
lam_lng_lat <- read.csv(lam_kunnat,colClasses=c('numeric','numeric','character','character','character','character','character','character','character','character','character','character'),header = TRUE, sep = ",")
kunta_lng_lat <- read.csv(kunta_center,colClasses=c('character','character','numeric','numeric'),header = TRUE, sep = ",")

#Haetaan kunnan keskipisteen koordinaatit
k1_lng_lat <- kunta_lng_lat %>% filter(kunta %in% k1)

#Create a dummy data frame.
longitude <- lam_lng_lat$lng
latitude <- lam_lng_lat$lat

temp <- data.frame(longitude, latitude)
nearest_point <- get_nearest_point(lon = k1_lng_lat$lng, lat = k1_lng_lat$lat, pointDf = temp)

sum(str_detect(lam_lng_lat$kunta, k1)) > 0
if (sum(str_detect(lam_lng_lat$kunta, k1)) > 0) {
  lam_lng_lat_kunta <- lam_lng_lat %>% filter(kunta %in% k1)
} else {
  lam_lng_lat_kunta <- lam_lng_lat %>%
    filter(lng == nearest_point$lon & lat == nearest_point$lat)
}

length_lams <- length(lam_lng_lat_kunta$tmsNumber)

#Haetaan lam_idt
lam_vec <- c(lam_lng_lat_kunta$tmsNumber)
lam_vec_ids <- split(x = lam_vec, f = lam_vec)

firstVector <- 1:length_vuodet

new_matrix <- cbind(firstVector, lam_vec_ids)
data <- list() # I first create an empty list

tmsId <- lam_lng_lat_kunta$tmsNumber

#tmsId = lam_vec_ids
lam_historia = "https://tie.digitraffic.fi/api/tms/v1/history/raw/lamraw_"

#MÄÄRITELLÄÄN PARAMETRIT
vuosi = vuodet
vuosi_viiva = paste("_",vuosi,sep="")
paiva = paiva_nro
paiva_viiva = paste("_",paiva,sep="")
vuosi_paiva = paste(vuosi_viiva,paiva_viiva,sep="")
vuosi_paiva_paate = paste(vuosi_paiva,".csv",sep="")

vec <- c()

for (i in 1:length_lams) {
  j <- i
  for (j in 1:length_vuodet) {
    new_elements <- print(paste0(lam_historia, tmsId[i],vuosi_paiva_paate[j]))
  j <- j+1
  vec <- c(vec, new_elements)
  }
}

lam_historia_api = vec

length_api <- length(lam_historia_api)

for (i in 1:length_api){
  
  skip_to_next <- FALSE
  
  tryCatch({
    
  # Get content into a data frame
  data[[i]] <- read.csv(lam_historia_api[[i]],colClasses=c('character','character','character','character','NULL','NULL','NULL','NULL','NULL','character','character','character','NULL','NULL','NULL','NULL'),
                        header = FALSE, sep = ";")
  colnames(data[[i]]) <- c("tmsNumber","vuosi","paiva","tunti","suunta")
  #c("pistetunnus","vuosi","paiva","tunti","minuutti","sekuntti","sadaosa","pituus_m","kaista","suunta","ajoneuvolk","nopeus","faulty", "kokonaisaika", "aikavali","jonoalku")
  
  },error = function(e) { skip_to_next <<- TRUE})
  if(skip_to_next) { next } 
}

# Mapping -> converting the list to  
# dataframe 
list_data <- Map(as.data.frame, data) 
# Converting the large list to dataframe 
# using the rbindlist function 
datarbind <- rbindlist(list_data) 


# Convert data frame to delimited string, then write to standard output
cat(format_csv(datarbind))