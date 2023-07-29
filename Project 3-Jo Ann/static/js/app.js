d3.json("my_database.nps_data.json").then(function(data) {
   console.log(data);
   
   
// Command to update the bar chart based on the State
function optionChanged(state) {
        doBarChart(state);
    
}


// Create barchart
function doBarChart(state) {
    
 //Filter the data based on the state
    let statesdata = data.filter(s => s.states === state);
    console.log(statesdata);

    stateList = [] //list of type of parks
    stateCount ={}//count of parks
    

    statesdata.forEach(st_abb => {
      if (!stateList.includes(st_abb.designation)) {
        stateList.push(st_abb.designation);
        stateCount[st_abb.designation]=0
            }
            stateCount[st_abb.designation]++
    })

    console.log(stateCount)
    console.log(stateList)

    dotview = []
    Object.keys(stateCount).forEach(key =>{
      dotview.push(stateCount[key])
    })
    
    //Create visual
    let trace = {
      y: stateCount,
      x: stateList,
      type: "bar",
      orientation: "v"
    };

    // Create data array
    let traces = [trace];
    let layout = {
      title: {
        text: "Type and Count of National Parks in your selected State",
        font: {
          family: "Comic Sans MS",
          size: 24,
          color: "purple"
        }
      },
      xaxis: {
        tickangle: -45,
        automargin: true
      }
    };
        // Create Plotly chart
        Plotly.newPlot("bar", traces, layout);
      }
      doBarChart();

  let dropdown = document.getElementById("selDataset");
  dropdown.addEventListener("change", function() {
    const selectedState = dropdown.value;
    optionChanged(selectedState);
  });

  // Define the data variable to hold fetched data
    
    data.forEach((name) => {
      let subjectId = document.createElement("option");
      subjectId.text = name.states; 
      subjectId.value = name.states; 
      dropdown.append(subjectId); 
      
      
    });
   
  })


  