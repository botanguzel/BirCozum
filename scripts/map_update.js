// Initialize and add the map
let map;
let hasClickedMap = false;

let markers = [];
let markersMapTwo = [];
let markersServer = [];
let markersAdvice = [];

let iconPath = "../mapicons/";

const icons = {
  Su: { icon: iconPath + "su.png" },
  Hayvan: { icon: iconPath + "hayvan.png" },
  Elektrik: { icon: iconPath + "elektrik.png" },
  Diger: { icon: iconPath + "diger.png" }
}

function getElement(elementId) {
	return document.getElementById(elementId);
}

const fetchAdvices = async () => {
  try {
    const response = await $.ajax({
      url: '../php/fetch.php?type=advices&order=desc',
      type: 'GET',
      dataType: 'json',
    });
    return response;
  } catch (error) {
    console.error('Error fetching advices:', error);
    return [];
  }
};

async function addAdvices(map, infoWindow) {
  let i = 0;
  try {
    const advices = await fetchAdvices();
    advices.forEach(advice => {
      const {lat, lng, advice_title, advice_desc, advice_type} = advice;
      const position = new google.maps.LatLng(lat, lng);
      const mark = addFetchedMarkers(position, map, advice_title, advice_type);
      
      mark.addListener('click', () => {
        infoWindow.setContent(advice_title);
        infoWindow.open(map, mark);
      });

      markersAdvice.push(mark);
    });
  } catch (error) {
    console.error('Error adding markers:', error);
  }
}

const fetchEntries = async () => {
  try {
    const response = await $.ajax({
      url: '../php/fetch.php?type=entries&order=desc', // Replace with the actual URL of your server-side script
      type: 'GET',
      dataType: 'json',
    });
    return response;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return [];
  }
};

async function addEntries(map, infoWindow) {
  let i = 0;
  try {
    const entries = await fetchEntries();
    entries.forEach(entry => {
      const {lat, lng, entry_title, entry_desc, entry_type} = entry;
      const position = new google.maps.LatLng(lat, lng);
      const mark = addFetchedMarkers(position, map, entry_title, entry_type);

      mark.addListener('click', () => {
        infoWindow.setContent(entry_title);
        infoWindow.open(map, mark);
      });

      markersServer.push(mark);
    });
  } catch (error) {
    console.error('Error adding markers:', error);
  }
}

function setPopup() {
  var popup = document.getElementById("popup");
				if (!hasClickedMap) {
					popup.style.visibility = "visible";
				}
				else { popup.style.visibility = "hidden"; }
}

function check() {
  setPopup();
  if(!hasClickedMap) {
    alert("Please click on the map before submitting the form");
    return false;
  }
}

function createCenterControl(map, id, content) {
  const controlButton = document.createElement("button");

  // Set CSS for the control.
  controlButton.style.backgroundColor = "#fff";
  controlButton.style.border = "2px solid #fff";
  controlButton.style.borderRadius = "3px";
  controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlButton.style.color = "rgb(25,25,25)";
  controlButton.style.cursor = "pointer";
  controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
  controlButton.style.fontSize = "16px";
  controlButton.style.lineHeight = "38px";
  controlButton.style.margin = "8px 5px 22px";
  controlButton.style.padding = "0 5px";
  controlButton.style.textAlign = "center";
  controlButton.textContent = content;
  controlButton.title = "";
  controlButton.type = "button";
  controlButton.id = id;
  // Setup the click event listeners: simply set the map to Chicago.

  return controlButton;
}


// Initialize and add the map
function initMap() {
    const seyrek = {
        lat: 38.584701,
        lng: 26.9700393
    };
    const izmir_bounds = {
        north: 38.657661,
        south: 38.452810,
        west: 26.803528,
        east: 27.153717
    };
	const options = {// Set the zoom of the map
        zoom: 13,
        center: seyrek,
        gestureHandling: 'cooperative',
		    minZoom: 13,
        maxZoom: 20,
        restriction: {latLngBounds: izmir_bounds,},
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
	}
  const map = new google.maps.Map( document.getElementById("map"), options);
	const map2 = new google.maps.Map(document.getElementById("map2"), options);
	
	const centerControlDiv = document.createElement("mapBTN");
	const centerControlDivTwo = document.createElement("SecondMapBTN");

	const centerControl = createCenterControl(map, "cb", "Gizle");
	const centerControlMapTwo = createCenterControl(map2, "cbs", "Gizle");
	
  const createFinLoc = createCenterControl(map, "locButton", "");
  const createFinLocTwo = createCenterControl(map, "locButton", "");
  const img = document.createElement("img");
  img.setAttribute('src', '../mapicons/konumum.png');
  img.setAttribute('alt', 'Konumumu bul');
  createFinLoc.appendChild(img);
  const imgTwo = document.createElement("img");
  imgTwo.setAttribute('alt', 'Konumumu bul');
  imgTwo.setAttribute('src', '../mapicons/konumum.png');
  createFinLocTwo.appendChild(imgTwo);
  createFinLoc.addEventListener('click', () => findLocation(map));
  createFinLocTwo.addEventListener('click', () => findLocation(map2));

  function findLocation(map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Konum Bulundu.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: Servis hatası."
        : "Error: Tarayıcınız geolocation desteklemiyor."
    );
    infoWindow.open(map);
  }

	centerControl.addEventListener("click", (e) => { hideMarkers(e.target.id, map); });
	centerControlMapTwo.addEventListener("click", (e) => { hideMarkers(e.target.id, map2); });
	
	centerControlDiv.appendChild(centerControl);
	centerControlDivTwo.appendChild(centerControlMapTwo);
  centerControlDivTwo.appendChild(createFinLocTwo);
  centerControlDiv.appendChild(createFinLoc);

	map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
	map2.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDivTwo);
  // Create a new InfoWindow instance
  const infoWindow = new google.maps.InfoWindow();
  addEntries(map, infoWindow);
  addAdvices(map2, infoWindow);
	map.addListener('click', function(e) { placeMarker(e.latLng, map, markers); deleteMarkers(markers); });
	map2.addListener('click', (e) => { placeMarkerTwo(e.latLng, map2, markersMapTwo); deleteMarkers(markersMapTwo); });	
}

function placeMarkerTwo(position, map, markers) {
  if (getLocTwo(position, map)) {
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });
    map.panTo(marker.position);
    map.setZoom(17);
    markers.push(marker);
    hasClickedMap = true;
  }
}

async function getLocTwo(position, map) {
var lat = getElement("lat1");
var lng = getElement("lng1");
var sName = getElement("street_advice");
if (lat != null && lng != null) {
  lat.setAttribute("Value", position.lat());
  lng.setAttribute("Value", position.lng());
  sName.setAttribute("Value", await createStreetName(position.lat(), position.lng()));
  return true;
}
else { return false;}
}
function placeMarker(position, map, markers) {
    if (getLoc(position, map)) {
      var marker = new google.maps.Marker({
        position: position,
        map: map
      });
      map.panTo(marker.position);
      map.setZoom(17);
      markers.push(marker);
      hasClickedMap = true;
    }
}

async function getLoc(position, map) {
	var lat = getElement("lat");
	var lng = getElement("lng");
  var sName = getElement('street_entry');
  if (lat != null && lng != null) {
	  lat.setAttribute("Value", position.lat());
	  lng.setAttribute("Value", position.lng());
    sName.setAttribute("Value", await createStreetName(position.lat(), position.lng()));
    return true;
  }
  else { return false;}
}

async function createStreetName(lat, lng) {
  var streetName = await getAddressFromLatLng(lat, lng);
  if (streetName.includes('Sokağı') || streetName.includes('Sokak')) { return streetName; }
  else if (endsWithInt(streetName)) { return streetName += '. Sokak';}
  else { return streetName += ' Sokağı';}
}

function endsWithInt(str) {
  const pat = /\d$/;
  return pat.test(str);
}

function getAddressFromLatLng(lat, lng) {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1] && results[2]) {
          const addressComponents = results[0].address_components;
          const addressComponents1 = results[1].address_components;
          const addressComponents2 = results[2].address_components;
          let streetName = '';
          for (let i = 0; i < addressComponents.length; i++) {
            if ( (addressComponents[i].types.includes('route') || addressComponents[i].types.includes('political')) ||
                  (addressComponents2[i].types.includes('route') || addressComponents2[i].types.includes('political')) ||
                  (addressComponents2[i].types.includes('route') || addressComponents2[i].types.includes('political'))
                ) {
              if (addressComponents[i].long_name.includes('+')) {
                if (addressComponents1[i].long_name === "İsimsiz Yol") {
                  streetName = addressComponents2[i].long_name;
                }  else { streetName = addressComponents1[i].long_name;                  }
              } else { streetName = addressComponents[i].long_name; }
              break;
            }
          }

          resolve(streetName);
        } else {
          reject('No results found');
        }
      } else {
        reject(`Geocoder failed with status: ${status}`);
      }
    });
  });
}

function setMapOnServer(markers, map) {
  for (let i = 0; i < markers.length; i++) {
    if (map) {
      markers[i].setMap(map);
    } else {
      markers[i].setMap(null);
    }
  }
}


function hideMarkers(id, map){
  if (id == "cb") {
    setMapOnServer(markersServer, null);
    getElement(id).textContent = "Göster";
    getElement(id).removeEventListener("click", function(e) { hideMarkers(e.target.id, map);});
    getElement(id).addEventListener("click", function(e) { showMarkers(e.target.id, map);});
  }
  else{
    setMapOnServer(markersAdvice, null);
    getElement(id).textContent = "Göster";
    getElement(id).removeEventListener("click", function(e) { hideMarkers(e.target.id, map);});
    getElement(id).addEventListener("click", function(e) { showMarkers(e.target.id, map);});
  }
}

function showMarkers(id, map){
  if (id == "cb") {
    setMapOnServer(markersServer, map);
    getElement(id).textContent = "Gizle";
    getElement(id).removeEventListener("click", function(e) { showMarkers(e.target.id, map);});
    getElement(id).addEventListener("click", function(e) { hideMarkers(e.target.id, map);});
  }
  else{
    setMapOnServer(markersAdvice, map);
    getElement(id).textContent = "Gizle";
    getElement(id).removeEventListener("click", function(e) { showMarkers(e.target.id, map);});
    getElement(id).addEventListener("click", function(e) { hideMarkers(e.target.id, map);});
  }
}
function deleteMarkers(markers) {
  if (markers.length > 1) {
		markers[0].setMap(null);
		markers.shift();
	}
}


function addFetchedMarkers(position, map, title, entry_type) {
	if (entry_type == "Su") {
    return new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          icon: icons[entry_type].icon
      });
  }
  else if (entry_type == "Elektrik") {
    return new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          icon: icons[entry_type].icon
      });
  }
  else if (entry_type == "Hayvan") {
    return new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          icon: icons[entry_type].icon
      });
  }
  else if (entry_type == "Diger") {
    return new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          icon: icons[entry_type].icon
      });
  }
}

initMap();