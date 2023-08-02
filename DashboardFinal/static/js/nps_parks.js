// Select data from json file to import
console.log("Start loading data...");
d3.json("my_database.nps_data_2.json")
  .then(function(data) {
    console.log("Data loaded successfully:", data);
    const features = data.features; // Assuming the array of features is under the 'features' property
    createMap(features);
  })
  .catch(function(error) {
    console.error("Error loading data:", error);
  });

 //Create base layers
 function createMap(stateparks) {
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  //Create a baseMaps Object.
  let baseMaps = {
    "Street": street,
    "Topographic": topo
  };

  // Create color marker based on the designation of the park
  function getMarkerColor(feature) {
    let designation = feature.properties.designation;
        if (designation.includes("Park")) {
      return "green";
    } else if (designation.includes("Trail")) {
      return "brown";
    } else if (designation.includes("River")) {
      return "blue";
    } else if (designation.includes("Preserve")) {
      return "coral";
    } else if (designation.includes("Lake")) {
      return "lightblue";
    } else if (designation.includes("Monument")) {
      return "yellow";
    } else if (designation.includes("Historic Site")) {
      return "black";
    } else {
      return "grey";
    }
  }   

  //Create state park visual style
  let stateparksLayer = L.geoJSON(stateparks, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        fillColor: getMarkerColor(feature),
        weight: 1,
        opacity: 1,
        fillOpacity: 0.75
      });
    },
    onEachFeature: function (feature, marker) {
      // Check if the 'activities' property exists and is not empty
      if (feature.properties.activities && feature.properties.activities.length > 0) {
        let activitiesList = feature.properties.activities.map((activity) => activity.name).join(", ");
        marker.bindPopup(`
          <h1><strong>Full Name: ${feature.properties.fullName}</strong></h1>
          <h2>Designation: ${feature.properties.designation}</h2>
          <h3>Activities: ${activitiesList}</h3>
        `);
      } else {
        marker.bindPopup(`
          <h1>FullName: ${feature.properties.fullName}</h1>
          <h2>Designation: ${feature.properties.designation}</h2>
          <h3>No activities listed.</h3>
        `);
      }
    }
  });

  // Create Overlays Object.
  let overlays = {
    "StateParks": stateparksLayer
  };

  //Create a new map to add layers
  let Mymap = L.map("mymap", {
    center: [38.7128, -94.0059],
    zoom: 3.6,
    layers: [street, stateparksLayer]
  });

  //Create a layer control containing our baseMaps
  L.control.layers(baseMaps, overlays, {
    collapsed: false
  }).addTo(Mymap);

// Create a legend
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  let div = L.DomUtil.create("div", "legend");
  let designations = [
    "Park",
    "Trail",
    "River",
    "Preserve",
    "Lake",
    "Monument",
    "Historic Site",
    "Others"
  ];
  let colors = ["green", "brown", "blue", "coral", "lightblue", "yellow", "black", "grey"];

  // Loop through each designation and create a legend item
  for (let i = 0; i < designations.length; i++) {
    div.innerHTML +=
      '<i style="background:' + colors[i] + '"></i> ' + designations[i] + "<br>";
  }
  return div;
};

// Add the legend to the map
legend.addTo(Mymap);



}
