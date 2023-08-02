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
 function createMap(stateparks) 
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

	let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

  // Create base layers
  let streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  
  let topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
    
	// control that shows state info on hover
	let info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
    this._div.innerHTML = '<h4>US National Park Regions</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' +
        props.Region + ' Region</sup><br>' +
        'Number of Parks: ' + props.numberOfParks :
        'Hover over a state');
};

	info.addTo(map);

	// get color depending on Region
	function getColor(d) {
		return d === "East" ? '#1f78b4' :
			d === "West"  ? '#33a02c' :
			d === "Midwest" ? '#e31a1c' :
			d === "South" ? '#ff7f00' :
			'#ffffff'; // Default color if the region doesn't match any of the above
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.Region)
		};
	}

	function highlightFeature(e) {
		let layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	let geojson;

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	/* global statesData */
	geojson = L.geoJson(statesData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);

	map.attributionControl.addAttribution('US-State.js data &copy; <a href="http://census.gov/">US Census Bureau</a>');

	let legend = L.control({ position: 'bottomright' });

	legend.onAdd = function (map) {
		let div = L.DomUtil.create('div', 'info legend');
		let regions = ['East', 'West', 'Midwest', 'South']; // Regions
		let labels = [];

		for (let i = 0; i < regions.length; i++) {
			labels.push(
				'<i style="background:' + getColor(regions[i]) + '"></i> ' +
				regions[i]
			);
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);

// Load the park data from the JSON file and create markers
const markerLayerGroup = L.layerGroup(); // Create layer group for markers
	fetch('my_database.nps_data.json')
		.then(response => response.json())
		.then(data => {
			data.forEach(park => {
				const name = park.name;
				const description = park.description;
				const region = park.Region;
				const lat = park.latitude;
				const lon = park.longitude;
				const url = park.url;
				const weatherInfo = park.weatherInfo;

				// Create a marker for each park and add it to the marker layer group
				const marker = L.marker([lat, lon]);
				const popupContent = `
					<b>${name}</b><br>
					<strong>Description:</strong> ${description}<br><br>
					<strong>Weather Info:</strong> ${weatherInfo}<br><br>
					<strong>URL:</strong> <a href="${url}" target="_blank">${url}</a>
				`;
				marker.bindPopup(popupContent);
				marker.addTo(markerLayerGroup);
			});
		})
		.catch(error => {
			console.error('Error loading park data:', error);
		});

	// Create an object to hold the base layers and overlay layers for the layer control
	const overlayMaps = {
		"Markers": markerLayerGroup, // Add the marker layer group as an overlay
	};

	// Add the layer control to the map, allowing users to toggle the visibility of markers
	L.control.layers(null, overlayMaps).addTo(map);

// Load US states GeoJSON data
function loadUSStatesData() {
	return new Promise((resolve, reject) => {
	  // Replace 'us-states.js' with the correct path to your GeoJSON file
	  $.getJSON("us-states.js")
		.done(function(data) {
		  resolve(data);
		})
		.fail(function(error) {
		  reject(error);
		});
	});
  }
  function createChoroplethLayer(geoJSONData) {
	return L.geoJSON(geoJSONData, {
	  style: function(feature) {
		const stateCode = feature.properties.code; // Assuming the state code is available in the GeoJSON data
		const value = choroplethData[stateCode]; // Get the value from choroplethData object
		return {
		  fillColor: getColor(value), // Define a function to get the color based on value
		  weight: 2,
		  opacity: 1,
		  color: 'white',
		  dashArray: '3',
		  fillOpacity: 0.7
		};
	  },
	  onEachFeature: function(feature, layer) {
		// Bind a popup showing the state name and the value from choroplethData
		const stateName = feature.properties.name;
		const stateCode = feature.properties.code;
		const value = choroplethData[stateCode] || "N/A"; // Provide a default value if no data is available
		layer.bindPopup(`<b>${stateName}</b><br>Value: ${value}`);
	  }
	});
  }
  function getColor(value) {
	// Customize this function to define the color scale based on your data values
	return value >= 100 ? '#800026' :
		   value >= 50  ? '#BD0026' :
		   value >= 20  ? '#E31A1C' :
		   value >= 10  ? '#FC4E2A' :
		   value >= 5   ? '#FD8D3C' :
		   value >= 2   ? '#FEB24C' :
		   value >= 1   ? '#FED976' :
						  '#FFEDA0';
  }
  function loadChoroplethLayer(map) {
	loadUSStatesData()
	  .then(function(geoJSONData) {
		const choroplethLayer = createChoroplethLayer(geoJSONData);
		choroplethLayer.addTo(map);
	  })
	  .catch(function(error) {
		console.error("Error loading US states data:", error);
	  });
  }
  loadChoroplethLayer(map);


  
   

  
			