L.map('map').setView([37.8, -96], 4);


	let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
    
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
statesData=[]

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
	map.addTo(document.getElementById('map'));