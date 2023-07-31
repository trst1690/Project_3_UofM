// Load the park data from the JSON file and create markers
fetch('my_database.nps_data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Filter out parks with multiple states
    data = data.filter(park => park.states.split(',').length === 1);

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
      stateCount = {} //count of parks

      statesdata.forEach(st_abb => {
        if (!stateList.includes(st_abb.designation)) {
          stateList.push(st_abb.designation);
          stateCount[st_abb.designation] = 0;
        }
        stateCount[st_abb.designation]++;
      });

      console.log(stateCount);
      console.log(stateList);

      dotview = [];
      Object.keys(stateCount).forEach(key => {
        dotview.push(stateCount[key]);
      });

      //Create visual
      let trace = {
        y: stateCount,
        x: stateList,
        type: 'bar',
        orientation: 'v',
      };

      // Create data array
      let traces = [trace];
      let layout = {
        title: {
          text: 'Type and Count of National Parks in your selected State',
          font: {
            family: 'Comic Sans MS',
            size: 24,
            color: 'purple',
          },
        },
        xaxis: {
          tickangle: -45,
          automargin: true,
        },
      };
      // Create Plotly chart
      Plotly.newPlot('bar', traces, layout);
    }

    // Populate the dropdown with unique states in ascending order
    let dropdown = document.getElementById('selDataset');
    let uniqueStates = [...new Set(data.map(item => item.states))];
    uniqueStates.sort(); // Sort the states in ascending order
    uniqueStates.forEach(state => {
      let stateOption = document.createElement('option');
      stateOption.text = state;
      stateOption.value = state;
      dropdown.appendChild(stateOption);
    });

    // Call the doBarChart function with the default state (the first one in the dropdown)
    doBarChart(uniqueStates[0]);

    // Add event listener to the dropdown
    dropdown.addEventListener('change', function () {
      const selectedState = dropdown.value;
      optionChanged(selectedState);
    });
  })
  .catch(error => {
    console.error('Error loading park data:', error);
  });

