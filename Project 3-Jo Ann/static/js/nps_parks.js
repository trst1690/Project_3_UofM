// Select data from json file to import
d3.json("my_database.nps_data.json").then(function(data) {
  console.log(data);


//Create map
createMap(data.features);
})

// //Create base layers
// function createMap(earthquakes) {
//     let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     })

//     let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//         attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//     })

// //Create a baseMaps Object.
//     let baseMaps = {
//         "Street": street,        
//     };

// // Get size of markers based on magnitude
// function getMarkerSize(magnitude) {
//     return Math.max(0, magnitude) * 3; 
//   };

// // Create color marker based on the depth of the earthquake
//     function getMarkerColor(geometry) {
//         let depth = geometry.coordinates[2];
//     if (depth >= -10 && depth < 10) {
//       return '#32CD32'; // Lime Green
//     } else if (depth >= 10 && depth < 30) {
//       return '#98FB98'; // Pale Green
//     } else if (depth >= 30 && depth < 50) {
//       return '#FFA500'; // Orange
//     } else if (depth >= 50 && depth < 70) {
//       return '#FF7F50'; // Coral
//     } else if (depth >= 70 && depth < 90) {
//       return '#FF4500'; // OrangeRed
//     } else {    
//       return '#FF0000'; // Red
//     }
//   }

// //Create earthquake visual style
//   let earthquakeLayer = L.geoJSON
//         (earthquakes, {
//         pointToLayer: function (feature, latLong) {
//         return L.circleMarker(latLong, {
//         radius: getMarkerSize(feature.properties.mag),
//         fillColor: getMarkerColor(feature.geometry),
//             weight: 1,
//             opacity: 1,
//             fillOpacity: 0.5})   
//         },  
//             onEachFeature: function(feature, marker) {
//             marker.bindPopup(`
//             <h1>Magnitude: ${feature.properties["mag"]}<h1>
//             <h2>Depth: ${feature.geometry["coordinates"][2]}</h2>
//             <h3>Location: ${feature.properties["place"]}</h3>`);
//             }
//     })

// // Create Overlays Object.
//     let overlays = {    
//        "Earthquakes": earthquakeLayer 
//     };

// //Create a new map to add layers
//     let Mymap = L.map("map", {
//         center: [38.7128, -94.0059],
//         zoom: 3.6,
//         layers: [street]
//     })

// //Create a layer control containing our baseMaps
// L.control.layers(baseMaps, overlays, {
//     collapsed: false    
// }).addTo(Mymap)   
}
