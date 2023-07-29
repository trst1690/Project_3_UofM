//fetch json file with park data
fetch('data.js')
  .then(response => response.json())
  .then(data => {
  
  console.log(data)
  let parkMarkers = [];
  // Loop through the data array and create parkMarker object
  for (let i = 0; i < data.length; i++) {
    const park = data[i];
    const parkMarker = {
      // Retrieve the park name, number of activities for each park, and its coordinates
      name: park.name,
      activity: park.Activities,
      lat: parseFloat(park.lat),
      lon: parseFloat(park.lon)
    };
    //Push parkmarker object defined above and pass into a list
    parkMarkers.push(parkMarker);
  }
  
  // Map and return park name, activity, and its coordinates
  let parkNodes = parkMarkers.map(
      function(parks) {
          return {
              id: `${parks.name}<br>Total Activities: ${parks.activity}`,
              coordinates: [parks.lon, parks.lat]

          };
      }
  );
  
  console.log(parkNodes);
  //Slice the parkNodes object to 45 data points
  //ZoomChart trial has a limit on the numbers of data allowed to map
  ///Only 45 out of 470 parks on the map
  parkNodes = parkNodes.slice(0,45); 
  
  //Create new chart that referencees parkNodes (park information)
  //Source code: https://zoomcharts.com/en/chart-types-demo/grouped-location-chart-using-geochart
  chart = new GeoChart({
    layers: [
      {
        id: "layerId",
        type: "items",
        data: [],
        aggregation: {
          enabled: true
      },
       
        style: {
          node: {
              lineColor: "transparent",
              radius: 15
          },
          "nodeStyleFunction":  function (node) {
                  var aggr = node.data.aggregatedNodes;
                  if(aggr.length > 1) {
                    node.display = "roundtext";
                    node.label = aggr.length;	
                  } else {
                    node.display = "droplet";
                    node.label = aggr[0]["id"];
                    node.labelStyle.backgroundStyle.fillColor = "#b0dc0b";
                    node.labelStyle.backgroundStyle.lineColor = "#b0dc0b";
                  }
                }
              }
            }
          ],
    navigation:
    {
      initialLat: 37,
      initialLng: -95,
      initialZoom: 4
    },
    background:
    {
      enabled: true,
      type: "tile",
      url: "https:\/\/maps.zoomcharts.com\/{z}\/{x}\/{y}.png",
      params: {
        attribution: "&copy; <a target=\"_blank\" href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
      }
    },
    container: document.getElementById("zoomchart"),
    data: {
      preloaded: {
          nodes: parkNodes,
          loaded: true,
          
      }
    },
    interaction: {
      resizing:
      {
        enabled:false
      }
    }
    
  });
 
});



