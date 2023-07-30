# Project_3_UofM




_____________________________________________________________________________________________________________________________
PROJECT DETAILS: 

_____________________________________________________________________________________________________________________________

Park Discoveries: Visualizing Data from the U.S. National Park Service

The U.S National Park Service API has a variety of comprehensive park data in the United States and its territories, including amenities, alerts, general park information, activities, campgrounds, and more. Refer to NPS's full API Documentation here: https://www.nps.gov/subjects/developer/api-documentation.htm#/activities/getActivities. We use NPS to make interactive visualizations for hikers, camp-goers, and park lovers, bringing the great outdoors to life in exciting and interactive ways. 

In this project, our main focus was on API parks, which provide an extensive list of park activities, addresses, coordinates, contacts, descriptions, designations, park names, images, and weather information. To gather this park data, we utilized API calls within a Flask app, and then connected the retrieved data to a MongoDB database. From there, we used JavaScript to process the data for the visualizations, which were integrated into a Bootstrap HTML page.


![Our Data Retrieval Process](https://github.com/trst1690/Project_3_UofM/assets/126814705/e67eed6a-31be-4bb6-b81d-70c9b1a0f857)




For a deeper understanding and preview of our data, we leveraged Jupyter Notebook to access the MongoDB database containing the park data. The dataset consisted of 470 unique records, out of which 36 had unclassified park designations. By following this approach, we were able to present an informative and visually engaging representation of park-related information, making it easier for users to explore and appreciate the diverse offerings of these parks. 

The top five U.S. park designations are National Monument, National Historic Site, National Historic Park, National Park, and an untitled park designation, respectively. In our analysis, we discovered that U.S. National Parks offers the most extensive range of activities for park-goers, with over 1,500 activities in total. Following closely behind, U.S. National Monuments provide visitors with a significant variety of 898 activities. Ranked third are U.S. National Historic Parks, offering 752 activities. These findings align with our expectations, as these park designations fall under most U.S. parks, catering to various visitor interests and preferences. 

<img width="821" alt="barScreenshot" src="https://github.com/trst1690/Project_3_UofM/assets/126814705/1b779c2f-2cb3-4c5d-9e82-601f8db0e9c8">



__________________________________________________________________________________________________________________________________

ABOUT OUR INTERACTIVE VISUALIZATIONS

___________________________________________________________________________________________________________________________________







Tools: Flask App, JavaScript, HTML, CSS, Pandas, MongoDB, ZoomChart (JavaScript Library), & Leaflet

______________________________________________________________________________________________________________________________

Task Distribution for U.S. National Parks API Project:

- Travis: created the flask to pull the data from the NPS api and to get into a dataframe using MongoDB
- Ayan: created a python file to scrub and get an idea of the actual content.  She created bar charts within and here we had planned on doing a heat map.  However we got clarification that all our code needs to be in JS and all our visuals need to be on one Dashboard.
- Ayan: created JS code using a new structure for a ZoomChart map.  This however turned challenging as it would only pull 45 of the 470 records we found.  It was also found that this would not speak well to leaflet which was being used for other visuals.
- Jo Ann: created new coding in JS, however the data file pulled original had several lines in it which exceeded the length of reablity, creating a new challenge in it self.  She than created a new data.json file that was something that could be pulled in and all data was useable. Pushed a new folder with new html for js code.  Two static folders were pushed as well.  This was for reference to help with combination of the first coding of the barchart to leaflet.
