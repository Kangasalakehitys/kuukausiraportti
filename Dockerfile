FROM r-base:latest

RUN R -e \
    'install.packages(c("tidytext","readr","plyr", "stringr", "jsonlite","pxweb","tidyr","httr","rjstat","reshape2"),"/usr/lib/R/site-library", Ncpus = 4)'