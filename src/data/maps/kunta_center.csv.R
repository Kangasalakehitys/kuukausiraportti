# Attach libraries (must be installed)
library(readr)
library(dplyr)
library(tidyr)

# Data access, wrangling and analysis
kunta_center <- read_csv("./kunta_center.csv")

# Convert data frame to delimited string, then write to standard output
cat(format_csv(kunta_center))