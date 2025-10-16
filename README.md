# Map Explorer of England Protected Areas
## Overview
This project aims to address the problem of limited public awareness by building an interactive web mapping application, “Map Explorer of England Protected Areas”. Open Government data from Department for Environment Food & Rural Affairs (DEFRA) accessed through its Data Services Platform and web-GIS tools are used to create a client-side map that visualises England’s protected areas and educates users about the areas’ distribution and designation.

## Data Sources
The official protected-area boundary datasets published by UK government agency; DEFRA are used to develop this web-GIS application. Each of the four datasets is sourced from the DEFRA Data Services Platform, open data portal under the UK Open Government License. The National Parks dataset provides polygon boundaries for each for England’s ten National Parks (DEFRA, 2024c). Similarly, the AONBs dataset covers 34 areas designated for outstanding natural beauty (DEFRA, 2024a). The SPAs layer includes 1079 EU Birds Directive sites (“classified” SPAs) (DEFRA, 2024d). The NNRs (England) dataset contains 224 sites declared under national conservation law (DEFRA, 2024b). All datasets are pre-processed using QGIS into four columns: id, type, measure (area in km2, except ha for SPAs), and name, to uniformly display in Leaflet.

DEFRA 2024a. Areas of Outstanding Natural Beauty (England) - Defra Data Services Platform. Data.gov.uk. [Online]. [Accessed 14 May 2025]. Available from: https://environment.data.gov.uk/dataset/0c1ea47f-3c79-47f0-b0ed-094e0a136971. <br>
DEFRA 2024b. National Nature Reserves (England) - Defra Data Services Platform. Data.gov.uk. [Online]. [Accessed 14 May 2025]. Available from: https://environment.data.gov.uk/dataset/ff213e4c-423a-4d7e-9e6f-b220600a8db3.<br>
DEFRA 2024c. National Parks (England) - Defra Data Services Platform. Data.gov.uk. [Online]. [Accessed 15 May 2025]. Available from: https://environment.data.gov.uk/dataset/e819098e-e248-4a8f-b684-5a21ca521b9b.<br>
DEFRA 2024d. Special Protection Areas (England) - Defra Data Services Platform. Data.gov.uk. [Online]. [Accessed 13 May 2025]. Available from: https://environment.data.gov.uk/dataset/4c660eee-887e-4c8b-91e5-d84b4c1078ac.<br>


## Technical Architecture
The web application is implemented entirely on client side using standard web technologies: HTML, CSS, and JavaScript. Leaflet is leveraged as the mapping library since it is lightweight, and open-source. The site is hosted using Netlify, a development platform for web application deployments. The overall stack as shown in the figure – HTML, CSS, JS + Leaflet + OSM tiles + Nominatim + Netlify – shows the use of open-source tools and data for web-based GIS.

<img width="1000" height="300" alt="image" src="https://github.com/user-attachments/assets/25ebb572-7708-4c5e-8601-38db9d633619" />

## Access to the Web Application
It can be accessed through the deployed link: "https://geog5870-england-protected-areas.netlify.app/"
