let map = L.map('map').setView([37.8, -96], 4);

	let streetLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

	let topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
		attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
	});

	let tiles = streetLayer.addTo(map); // Set the default layer to street

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
	let markerControl;

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

			// Create a custom control for switching between street, topography, and markers
			markerControl = L.control({ position: 'topright' });

			markerControl.onAdd = function (map) {
				const div = L.DomUtil.create('div', 'marker-control');

				// Create radio buttons for choosing base layer
				const inputStreet = L.DomUtil.create('input', 'map-layer');
				inputStreet.type = 'radio';
				inputStreet.name = 'base-layer';
				inputStreet.value = 'street';
				inputStreet.checked = true; // Show street layer by default
				inputStreet.addEventListener('change', function () {
					if (this.checked) {
						map.removeLayer(topoLayer);
						map.addLayer(streetLayer);
					}
				});

				const labelStreet = L.DomUtil.create('label', 'layer-label');
				labelStreet.innerHTML = 'Street';
				labelStreet.setAttribute('for', 'street');

				const inputTopo = L.DomUtil.create('input', 'map-layer');
				inputTopo.type = 'radio';
				inputTopo.name = 'base-layer';
				inputTopo.value = 'topo';
				inputTopo.addEventListener('change', function () {
					if (this.checked) {
						map.removeLayer(streetLayer);
						map.addLayer(topoLayer);
					}
				});

				const labelTopo = L.DomUtil.create('label', 'layer-label');
				labelTopo.innerHTML = 'Topography';
				labelTopo.setAttribute('for', 'topo');

				// Create checkbox for markers
				const inputMarkers = L.DomUtil.create('input', 'map-layer');
				inputMarkers.type = 'checkbox';
				inputMarkers.name = 'show-markers';
				inputMarkers.value = 'markers';
				inputMarkers.checked = false; // Show markers by default
				inputMarkers.addEventListener('change', function () {
					if (this.checked) {
						markerLayerGroup.addTo(map);
					} else {
						markerLayerGroup.removeFrom(map);
					}
				});

				const labelMarkers = L.DomUtil.create('label', 'layer-label');
				labelMarkers.innerHTML = 'Markers';
				labelMarkers.setAttribute('for', 'markers');

				// Append elements to the control div
				div.appendChild(inputStreet);
				div.appendChild(labelStreet);
				div.appendChild(inputTopo);
				div.appendChild(labelTopo);
				div.appendChild(inputMarkers);
				div.appendChild(labelMarkers);

				return div;
			};

			markerControl.addTo(map); // Add the custom control to the map
		})
		.catch(error => {
			console.error('Error loading park data:', error);
		});