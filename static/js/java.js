

fetch('data.js')
  .then(response => response.json())
  .then(data => {
    console.log(data)

    let parkMarkers = [];
    // Loop through the data array and create parkMarkers objects
    for (let i = 0; i < data.length; i++) {
      const park = data[i];
      // Create a park marker object with the latitude, longitude
      const parkMarker = {
        // Convert lat & lon to a floating-point number
        lat: parseFloat(park.lat),    
        lon: parseFloat(park.lon), 
        name: park.name,
        imageUrl: park.Image,
        imageCaption: park['Image Caption']   
      };

      parkMarkers.push(parkMarker);
      
    }

    let parkNodes = parkMarkers.map(
        function(park) {
            return {
                id: park.name,
                coordinates: [park.lon, park.lat]
            };
        }
    );
    console.log(parkNodes);
    console.log([
        { id: "Squaw Valley", coordinates: [-119.181449, 36.707146] }, // long, lat
        { id: "Atlanta", coordinates: [-84.388846, 33.752504] },
        { id: "New York", coordinates: [-73.996705, 40.74838] },
        { id: "Lake Placid", coordinates: [-81.364918, 27.294474] }
    ]);
    parkNodes = parkNodes.slice(0,100);

    var chart = new GeoChart({
      layers: [
        {   
          id: "default",
          type: "items",
          aggregation: {
            enabled: true
          },
          style: {
            node: {
              lineColor: "transparent",
              radius: 15

            },
            "nodeStyleFunction": function (node) {
                console.log("styling", node);
              var aggr = node.data.aggregatedNodes;
              if (aggr.length > 1) {
                node.display = "roundtext";
                node.label = aggr.length;
              } else {
                node.display = "droplet";
                node.label = aggr[0]["name"];
                node.labelStyle.backgroundStyle.fillColor = "#b0dc0b";
                node.labelStyle.backgroundStyle.lineColor = "#b0dc0b";
              };
            }
          }
        }
      ],
      navigation:
      {
        initialLat: 40,
        initialLng: -100,
        initialZoom: 1
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
            loaded: true
        }
      },

      interaction: {
        resizing:
        {
          enabled: false
        }
      }
    });
  });
/* 
  var chart = new GeoChart({
    container: document.getElementById("zoomchart"),

    data: {
        preloaded: {
            nodes: [
                { id: "Squaw Valley", coordinates: [-119.181449, 36.707146] }, // long, lat
                { id: "Atlanta", coordinates: [-84.388846, 33.752504] },
                { id: "New York", coordinates: [-73.996705, 40.74838] },
                { id: "Lake Placid", coordinates: [-81.364918, 27.294474] }
            ],
            links: [
                { from: "New York", to: "Atlanta", drivingTime: "13 hours 3 mins" },
                { from: "New York", to: "Squaw Valley", drivingTime: "1 day 18 hours" },
                { from: "New York", to: "Lake Placid", drivingTime: "17 hours 33 mins" },
                { from: "Lake Placid", to: "Squaw Valley", drivingTime: "1 day 15 hours" },
                { from: "Atlanta", to: "Squaw Valley", drivingTime: "1 day 10 hours" }
            ]
        }
    },
    layers: [
        {
            name: "Points",
            type: "items",
            style: {
                linkStyleFunction: function (link) {
                    link.label = link.data.drivingTime;
                }
            }
        }
    ],
    navigation: {
        initialLat: 35.04409,
        initialLng: -90.246213,
        initialZoom: 4,
        minZoom: 4
    }
}); */