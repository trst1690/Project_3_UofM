// Function to create the bar chart
function doBarChart(data, selectedState) {
  //Filter the data based on the state
  let statesdata = data.filter(s => s.states === selectedState);

  stateList = []; //list of types of parks
  stateCount = {}; //count of parks

  statesdata.forEach(st_abb => {
    if (!stateList.includes(st_abb.designation)) {
      stateList.push(st_abb.designation);
      stateCount[st_abb.designation] = 0;
    }
    stateCount[st_abb.designation]++;
  });

  dotview = [];
  Object.keys(stateCount).forEach(key => {
    dotview.push(stateCount[key]);
  });

  //Create visual
  let trace = {
    y: dotview, // Using dotview here, as it holds the count of parks
    x: stateList,
    type: "bar",
    orientation: "v"
  };

  // Create data array
  let traces = [trace];
  let layout = {
    title: {
      text: `Park Designation & Count for ${selectedState}`,
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

// Function to get the image URL for the selected state
async function getImageUrlForState(data, selectedState) {
  const statesData = data.filter(s => s.states === selectedState);
  if (statesData.length > 0) {
    // Assuming the images are stored as an array in the "images" property of the state's data
    const images = statesData[0].images;
    if (images && images.length > 0) {
      // Get the URL of the first image for the selected state
      return images[0].url;
    }
  }
  // Return a default image URL if no image is found for the selected state
  return "default_image_url.jpg";
}

// Load the data and process it
d3.json("my_database.nps_data.json").then(function(data) {
  console.log(data);
  let uniqueStates = new Set();

  for (let i = 0; i < data.length; i++) {
    let parkdata = data[i];
    let statesArray = parkdata.states.split(',').map(state => state.trim().substring(0, 2));

    statesArray.forEach(state => {
      if (!uniqueStates.has(state)) {
        uniqueStates.add(state);
        console.log("Unique State:", state);
      }
    });
  }

  console.log(Array.from(uniqueStates));

  // Command to update the bar chart based on the State
  function optionChanged(selectedState) {
    // Update the image URL based on the selected state
    getImageUrlForState(data, selectedState).then(imageUrl => {
      document.getElementById("stateImage").src = imageUrl;
    });

    // Call the doBarChart function
    doBarChart(data, selectedState);
    
  }

  
  // Populate the dropdown with unique two-letter state abbreviations from the fetched data
  let dropdown = document.getElementById("selDataset");
  Array.from(uniqueStates).forEach(state => {
    let option = document.createElement("option");
    option.text = state;
    option.value = state;
    dropdown.append(option);
  });
  // Add event listener to the dropdown
  dropdown.addEventListener("change", function() {
    const selectedState = dropdown.value;
    optionChanged(selectedState);
   
  });

  // Call the initial chart with the first state in the dropdown
  if (data.length > 0) {
    optionChanged(data[0].states);
  }
});

  

