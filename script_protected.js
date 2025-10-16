var map;

// Make layer groups available globally
var npLayer, aonbLayer, spaLayer, nnrLayer;

var myIcon = L.icon({
   iconUrl : 'national_park.png',
   iconSize:[16,16]
});


//Create the map object and set the centre point and zoom level 
function initialize() {
	console.log("JavaScript file is loaded.");
	map = L.map('mapdiv');
	map.setView([54.5, -2.5], 6);
		
	//Load tiles from open street map
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:'Map data ©OpenStreetMap contributors, CC-BY-SA, Imagery ©CloudMade',
		maxZoom: 18	
	}).addTo(map); //add the basetiles to the map object
	
	npLayer = L.layerGroup().addTo(map);
	aonbLayer = L.layerGroup().addTo(map);
	spaLayer = L.layerGroup().addTo(map);
	nnrLayer = L.layerGroup().addTo(map);
	
	// Add layer controls to toggle between overlays
	L.control.layers(null, {
		'National Parks': npLayer,
		'National Nature Reserves': nnrLayer,
		'Special Protection Areas': spaLayer,
		'Areas of Oustanding Natural Beauty': aonbLayer
	}).addTo(map);

	// Load data once the map and layers are ready
	loadProtectedAreas();
	
	// Add legend bar
	var legend = L.control({ position: 'bottomleft' });

	legend.onAdd = function(map) {
		var div = L.DomUtil.create('div', 'info legend');
		var types = ['National Park', 'Areas of Oustanding Natural Beauty', 'Special Protection Areas', 'National Nature Reserves'];
		var colors = ['#20ff0c', '#0ffff3', '#e8718d', '#1b4400'];

		div.innerHTML += '<h4>Protected Areas</h4>';

		for (var i = 0; i < types.length; i++) {
			div.innerHTML +=
			'<i style="background:' + colors[i] + '"></i> ' +
			types[i] + '<br>';
		}
		return div;
	};
	legend.addTo(map);
}

function loadProtectedAreas() {
// Load National Parks
	fetch('National_Parks_England.json')
		.then(res => res.json())
		.then(data => {
			const layer = L.geoJSON(data, {
				style: { color: '#20ff0c', fillOpacity: 0.6 },
				onEachFeature: (feature, layer) => {
					layer.bindPopup(`
						<b>${feature.properties.name}</b><br>
						Type: National Park<br>
						Area: ${feature.properties.measure} km2
        `);
      }
    }).addTo(npLayer);
  });

// Load National Nature Reserves
	fetch('National_Nature_Reserves_England.json')
		.then(res => res.json())
		.then(data => {
			const layer = L.geoJSON(data, {
				style: { color: '#1b4400', fillOpacity: 0.5 },
				onEachFeature: (feature, layer) => {
					layer.bindPopup(`
						<b>${feature.properties.name}</b><br>
						Type: National Nature Reserve<br>
						Area: ${feature.properties.measure} km2
        `);
      }
    }).addTo(nnrLayer);
  });

// Load Special Protection Areas
	fetch('Special_Protection_Areas_England.json')
		.then(res => res.json())
		.then(data => {
			const layer = L.geoJSON(data, {
				style: { color: '#e8718d', fillOpacity: 0.4 },
				onEachFeature: (feature, layer) => {
					layer.bindPopup(`
						<b>${feature.properties.name}</b><br>
						Type: Special Protection Area<br>
						Area: ${feature.properties.measure} ha
        `);
      }
    }).addTo(spaLayer);
  });

// Load AONBs
	fetch('Areas_of_Outstanding_Natural_Beauty_England.json')
		.then(res => res.json())
		.then(data => {
			const layer = L.geoJSON(data, {
				style: { color: '#0ffff3', fillOpacity: 0.3 },
				onEachFeature: (feature, layer) => {
					layer.bindPopup(`
						<b>${feature.properties.name}</b><br>
						Type: Area of Outstanding Natural Beauty<br>
						Area: ${feature.properties.measure} km2
        `);
      }
    }).addTo(aonbLayer);
  });
}

// Filter functionality
function filterAreas() {
  const value = document.getElementById("typeFilter").value;
  if (value === "np") {
    map.addLayer(npLayer);
    map.removeLayer(aonbLayer);
	map.removeLayer(nnrLayer);
	map.removeLayer(spaLayer);
  } else if (value === "nnr") {
    map.addLayer(nnrLayer);
    map.removeLayer(npLayer);
	map.removeLayer(spaLayer);
	map.removeLayer(aonbLayer);
  } else if (value === "spa") {
    map.addLayer(spaLayer);
    map.removeLayer(npLayer);
	map.removeLayer(nnrLayer);
	map.removeLayer(aonbLayer);
  } else if (value === "aonb") {
    map.addLayer(aonbLayer);
    map.removeLayer(npLayer);
	map.removeLayer(nnrLayer);
	map.removeLayer(spaLayer);
  } else {
    map.addLayer(npLayer);
	map.addLayer(nnrLayer);
	map.addLayer(spaLayer);
    map.addLayer(aonbLayer);
  }
}

// Search functionality
function searchLocation() {
	const query = document.getElementById("search-input").value;
	if (!query) return;

	fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
		.then(response => response.json())
		.then(data => {
			if (data.length > 0) {
				const place = data[0];
				const lat = parseFloat(place.lat);
				const lon = parseFloat(place.lon);
				map.setView([lat, lon], 12);
				L.marker([lat, lon]).addTo(map)
				.bindPopup(`<b>${place.display_name}</b>`).openPopup();
			} else {
				alert("Location not found.");
		}
    });
}

// for the display of the description block
function toggleDescription() {
	const desc = document.getElementById("description-block");
	const btn = document.getElementById("toggle-description");
	const isVisible = desc.style.display === "block";

	desc.style.display = isVisible ? "none" : "block";
	btn.innerText = isVisible ? "Click for Description ▼" : "Hide ▲";
}
