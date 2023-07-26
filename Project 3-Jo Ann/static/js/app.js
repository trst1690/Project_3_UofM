d3.json("my_database.nps_data.json").then(function(data) {
   console.log(data);

// Command to update the bar chart based on the State
function optionChanged(state) {
    doBarChart(state);
    // doBubbleChart(state_id);
}

// Create barchart
function doBarChart(state) {
    
 //Filter the data based on the state
    let statesdata = data.filter(s => s.states === state);
    console.log(statesdata);

    stateList = []
    stateCount ={}

    statesdata.forEach(st_abb => {
      if (!stateList.includes(st_abb.designation)) {
        stateList.push(st_abb.designation);
        stateCount[st_abb.designation]=0
            }
            stateCount[st_abb.designation]++
    })
    console.log(stateCount)

    dotview = []
    Object.keys(stateCount).forEach(key =>{
      dotview.push(stateCount[key])
    })
    
    //Create visual
    let trace = {
      y: stateCount,
      x: stateList,
      type: "bar"
      // orientation: "h"
    };

    // Create data array
    let traces = [trace];
    let layout = { title: "Parks" };  

    // Create Plotly chart
    Plotly.newPlot("bar", traces, layout);
  }
  doBarChart('CA')


// Fetch JSON data to populate dropdown
// d3.json("my_database.nps_data.json").then(function(result) {
  
  //////////////////////////////CREATE DROP DOWN????////////////////////////////////////////
//   const dropdown = d3.select("#selDataset");
//   const stateList = data.states.map(state => state.state);

//   // Add dropdown options
//   dropdown
//     .selectAll("option")
//     .data(stateList)
//     .enter()
//     .append("option")
//     .text(function(d) {
//       return d;
//     });

//   // Add event listener to the dropdown
//   dropdown.on("change", function() {
//     const selectedState = dropdown.property("value");
//     optionChanged(selectedState);
//   });

//   // Call the updateBarChart function with the initial sample_id
//   optionChanged(stateList[0]);
// }).catch(function(error) {
//   console.error(error);

});

//Promise pending  BUBBLE CHART
//  function doBubbleChart(state) {
//     stateList = []
//     stateCount ={}

//     let statesdata = data.filter(s => s.states === state);
//     statesdata.forEach(st_abb => {
//       if (!stateList.includes(st_abb.designation)) {
//         stateList.push(st_abb.designation);
//         stateCount[st_abb.designation]=0
//             }
//       stateCount[st_abb.designation]++
//     })
//     console.log(stateCount)
//     dotview = []
//     Object.keys(stateCount).forEach(key =>{
//       dotview.push(stateCount[key])
//     })
  
//     let trace2 = {
//         x: stateList,
//         y: dotview,
//         mode: 'markers',
//         marker: {
//           size: dotview * 500,
//           color: stateList,
//           colorscale: "Earth"
//         },
//         text: stateList
//       };
    
//       let data1 = [trace2];
      
//       let layout = {
//         showlegend: false,
//         height: 500,
//         width: 1000,
//         xaxis: {
//           title: 'Park Types'
//         },
        
//       };
    
//       Plotly.newPlot("bubble", data1, layout);
//     }

//   doBubbleChart('LA')
// //Create Demographics information box
//       let metadataDiv = d3.select("#sample-metadata");
//       metadataDiv.html("");
//       console.log(result);
//       let alldata = result.metadata;
//       let selectedMetadata = alldata.filter(metadata => metadata.id == sample_id);
//       console.log(selectedMetadata);
//       Object.entries(selectedMetadata[0]).forEach(([key, value]) => {
//         metadataDiv.append("p").text(`${key}: ${value}`);
//       })


