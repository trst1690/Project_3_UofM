# Project_3_UofM




_____________________________________________________________________________________________________________________________
PROJECT DETAILS: DashboardFinal for all documentation

_____________________________________________________________________________________________________________________________

Park Discoveries: Visualizing Data from the U.S. National Park Service

The U.S National Park Service API has a variety of comprehensive park data in the United States and its territories, including amenities, alerts, general park information, activities, campgrounds, and more. Refer to NPS's full API Documentation here: https://www.nps.gov/subjects/developer/api-documentation.htm#/activities/getActivities. We use NPS to make interactive visualizations for hikers, camp-goers, and park lovers, bringing park data to life in exciting and interactive ways. 

In this project, our main focus was on API parks, which provide an extensive list of park activities, addresses, coordinates, contacts, descriptions, designations, park names, images, weather information, etc. To gather this park data, we utilized API calls within a Flask app, and then connected the retrieved data to a MongoDB database. From there, we used JavaScript to process the data for the visualizations, which were integrated into a Bootstrap HTML page.




![dataprocess](https://github.com/trst1690/Project_3_UofM/assets/126814705/71dd8aaa-f54f-4441-8875-e6ca76b74664)





For a deeper understanding and preview of our data, we leveraged Jupyter Notebook to access the MongoDB database containing the park data. The dataset consisted of 470 unique records, out of which 36 had unclassified park designations. By following this approach, we were able to present an informative and visually engaging representation of park-related information, making it easier for users to explorethe diverse offerings of these parks. 

The top five U.S. park designations are National Monument, National Historic Site, National Historic Park, National Park, and an untitled park designation, respectively. In our analysis, we discovered that U.S. National Parks offers the most extensive range of activities for park-goers, with over 1,500 activities in total. Following closely behind, U.S. National Monuments provide visitors with a significant variety of 898 activities. Ranked third are U.S. National Historic Parks, offering 752 activities. These findings align with our expectations, as these park designations fall under most U.S. parks, catering to various visitor interests and preferences. 

<img width="821" alt="barScreenshot" src="https://github.com/trst1690/Project_3_UofM/assets/126814705/1b779c2f-2cb3-4c5d-9e82-601f8db0e9c8">



__________________________________________________________________________________________________________________________________

ABOUT OUR INTERACTIVE VISUALIZATIONS

___________________________________________________________________________________________________________________________________

ZOOMCHART JAVASCRIPT LIBRARY

We utilized the ZoomChart JavaScript Library to create a map visualization with markers that contain the park names and the number of activities each park offers. We chose ZoomChart as it has a feature to aggregate data points, which helps in reducing the number of markers shown at any given time. While this feature would have been helpful with the 470 parks we retrieved from the API, we were only able to display 45 out of the 470 unique parks. This limitation may be due to ZoomChart's cap on the number of data points that can be preloaded. The purpose of this visualization is to increase access to the number of activities each park provides, ensuring that park visitors make the most of their visit and experience as much as possible. Additionally, it aims to encourage park engagement.

LEAFLET JAVASCRIPT LIBRARY

We used Leaflet Javascript Library to create two additional map visualizations and a bar chart. One Leaflet map visualization contains markers for all 470 National Park sites. The markers are color coded depending on the designation of the park (e.g., trail, monument, park, etc.). Clicking on a marker will enable a popup with respective site’s full name, designation type, and list of activities available. We also created a similar map divided into four regions (East, West, Midwest, & South) using L.geoJSON to create a layer for state boundaries. This map has hover-over functionality, zoom feature, and descriptive popups for markers with park description, weather info, and url link to the park website. 

JAVASCRIP

We exported from MongoDB to get our DF in Json to build the Bar Chart and Drop Down.  Our Bar Chart, once a state is seleted from the drop down will give an image of the selected state park, as well as a chart indication the number of 'types' of national parks available for visiting in that particular state.

Tools: Flask App, JavaScript, HTML, CSS, Pandas, MongoDB, ZoomChart (JavaScript Library), & Leaflet

______________________________________________________________________________________________________________________________

Task Distribution for U.S. National Parks API Project:

- Travis: created the flask to pull the data from the NPS api and to get into a dataframe using MongoDB
- Ayan: created a python file to scrub and get an idea of the actual content.  She created bar charts within and here we had planned on doing a heat map.  However we got clarification that all our code needs to be in JS and all our visuals need to be on one Dashboard.
- Ayan: created JS code using a new structure for a ZoomChart map.  This however turned challenging as it would only pull 45 of the 470 records we found.  It was also found that this would not speak well to leaflet which was being used for other visuals.
- Jo Ann: created new coding in JS, however the data file pulled original had several lines in it which exceeded the length of reablity, creating a new challenge in it self.  She than created a new data.json file that was something that could be pulled in and all data was useable. Pushed a new folder with new html for js code.  Two static folders were pushed as well.  This was for reference to help with combination of the first coding of the barchart to leaflet.
