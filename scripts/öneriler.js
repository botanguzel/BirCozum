// Initialize and add the map
var map;
let markers = [];
let placedMarkers = [];
let infoWindow;
let hasClickedMap = false;
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

let isRunning = false; // Flag variable to track the execution status

function orderASC(id) {
  if (isRunning) { return; }
  else {
    if (id == "diger-advice") {
      orderData(id, 'asc');
      const element = document.getElementById('diger-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'bi bi-arrow-down';
      document.getElementById(id).addEventListener("click", function(e) { orderDESC(e.target.id);});
    } else if (id == "su-advice") {
      orderData(id, 'asc');
      const element = document.getElementById('su-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'bi bi-arrow-down';
      document.getElementById(id).addEventListener("click", function(e) { orderDESC(e.target.id);});
    } else if (id == "advices") {
      orderData(id, 'asc');
      const element = document.getElementById('advices');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'bi bi-arrow-down';
      document.getElementById(id).addEventListener("click", function(e) { orderDESC(e.target.id);});
    } else if (id == "hayvan-advice") {
      orderData(id, 'asc');
      const element = document.getElementById('hayvan-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'bi bi-arrow-down';
      document.getElementById(id).addEventListener("click", function(e) { orderDESC(e.target.id);});
    } else if (id == "elektrik-advice") {
      orderData(id, 'asc');
      const element = document.getElementById('elektrik-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'bi bi-arrow-down';
      document.getElementById(id).addEventListener("click", function(e) { orderDESC(e.target.id);});
    }
  }
}
function orderDESC(id) {
  if (isRunning) { return; }
  else {
    if (id == "diger-advice") {
      orderData(id, 'desc');
      const element = document.getElementById('diger-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'bi bi-arrow-up';
      document.getElementById(id).addEventListener("click", function(e) { orderASC(e.target.id);});
    } else if (id == "su-advice") {
      orderData(id, 'desc');
      const element = document.getElementById('su-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'bi bi-arrow-up';
      document.getElementById(id).addEventListener("click", function(e) { orderASC(e.target.id);});
    } else if (id == "advices") {
      orderData(id, 'desc');
      const element = document.getElementById('advices');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'bi bi-arrow-up';
      document.getElementById(id).addEventListener("click", function(e) { orderASC(e.target.id);});
    } else if (id == "hayvan-advice") {
      orderData(id, 'desc');
      const element = document.getElementById('hayvan-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'bi bi-arrow-up';
      document.getElementById(id).addEventListener("click", function(e) { orderASC(e.target.id);});
    } else if (id == "elektrik-advice") {
      orderData(id, 'desc');
      const element = document.getElementById('elektrik-advice');
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      const childElement = clone.querySelector('i');
      childElement.className = 'bi bi-arrow-up';
      document.getElementById(id).addEventListener("click", function(e) { orderASC(e.target.id);});
    }
  }
}



async function orderData(type, order) {
  infoWindow = new google.maps.InfoWindow();
  if (isRunning) return;

  isRunning = true;

  try {
    const [advices, usernames] = await Promise.all([
      fetcher(type, order),
      fetcher('username')
    ]);
  
    $('#leftColIn').empty();
    setMapOnServer(markers, null);
  
    const advicePromises = advices.map(async (advice) => {
      if (!isRunning) {
        return;
      }
  
      const { lat, lng, advice_title, advice_desc, advice_type, createdDate, status, userID , street_name} = advice;
      const usernameObj = usernames.find(user => user.userID === userID);
      const username = usernameObj ? usernameObj.username : "Unknown";
      const position = new google.maps.LatLng(lat, lng);
      const mark = addFetchedMarkers(position, map, advice_title, advice_type);
  
      mark.addListener('click', () => {
        infoWindow.setContent(advice_title);
        infoWindow.open(map, mark);
      });
  
      markers.push(mark); 
      return { username, advice_title, advice_desc, createdDate, status, position, street_name };
    });
  
    const advicesData = await Promise.all(advicePromises);
    advicesData.forEach(({ username, advice_title, advice_desc, createdDate, status, position, street_name }) => {
      cardCreator(username, advice_title, advice_desc, createdDate, status, position, street_name);
    });
  } catch (error) {
    console.error('Error adding advices:', error);
  } finally {
    isRunning = false;
  }
}


const fetcher = (type, order) => {
  var url = "";
  if (order == null) { url = "../php/fetch.php?type="+type; }
  else { url = "../php/fetch.php?type="+type+"&order="+order }
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function(response) {
        resolve(response);
      },
      error: function(xhr, status, error) {
        reject(error);
      }
    });
  });
};

async function cardCreator(username, advice_title, advice_desc, createdDate, state, position, street) {
  let s = "";
  if (state === 1) { s = "Sorun Devam Ediyor";}
  else { s = "Sorun Çözüldü"; }
  const htmladvices = document.createElement('div');
  const htmlAuthor = document.createElement('div');
  const htmlDesc = document.createElement('h3');
  const htmlTitle = document.createElement('h1');
  const htmlDate = document.createElement('b');
  const htmlStreet = document.createElement('h4');

  htmladvices.classList.add('card', 'shadow');
  htmlAuthor.classList.add('comment-author');
  htmlAuthor.setAttribute('id', 'usernames-container');
  htmlDate.classList.add('comment-date');
  htmlStreet.classList.add('comment-date');

  htmlAuthor.innerHTML = username;
  htmlTitle.innerHTML = advice_title;
  htmlDesc.innerHTML = advice_desc;
  htmlDate.innerHTML = createdDate +"<br>"+s;
  htmlStreet.innerHTML = street;

  htmladvices.addEventListener('mouseenter', () => {
    // Zoom to the marker
    const zoomOptions = {
      zoom: 18,
      center: position,
    };
       
    map.setOptions(zoomOptions);
    markers.forEach(marker => {
      if (marker.position.equals(position)) {
        if (marker.icon.includes('hayvan'))  { editMarkerIcons('in', marker, 'hayvan'); }
        else if (marker.icon.includes('elektrik')) { editMarkerIcons('in', marker, 'elektrik'); }
        else if (marker.icon.includes('su')) { editMarkerIcons('in', marker, 'su'); }
        else { editMarkerIcons('in', marker, 'diger'); }
        infoWindow.setContent(advice_title);
        infoWindow.open(map, marker);
        
      }
    });
  });

  htmladvices.addEventListener('mouseleave', () => {
    // Restore the original map view and show all markers
    const options = {
      zoom: 13,
      center: position,
    };
    map.setOptions(options);
    markers.forEach(marker => {
      if (marker.position.equals(position)) {
        if (marker.icon.includes('hayvan'))  { editMarkerIcons('out', marker, 'hayvan'); }
        else if (marker.icon.includes('elektrik')) { editMarkerIcons('out', marker, 'elektrik'); }
        else if (marker.icon.includes('su')) { editMarkerIcons('out', marker, 'su'); }
        else { editMarkerIcons('out', marker, 'diger'); }
      }
    })
    infoWindow.close();
  });

  function editMarkerIcons(type, marker, markerType) {
    if (type === 'in') {
      marker.setIcon(iconPath + markerType + '_seçili.png');
    } else if (type === 'out') {
      marker.setIcon(iconPath + markerType + '.png');
    }
  } 

  document.getElementById('leftColIn').appendChild(htmladvices);
  htmladvices.appendChild(htmlAuthor);
  htmladvices.appendChild(htmlTitle);
  htmladvices.appendChild(htmlDesc);
  htmladvices.appendChild(htmlStreet);
  htmladvices.appendChild(htmlDate);
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

function createCenterControl(id, content) {
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
	const options = {
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
  map = new google.maps.Map( document.getElementById("map3"), options);
  const map2 = new google.maps.Map(document.getElementById("map"), options);

  const centerControlDiv = document.createElement("mapBTN");
  const centerControlDivTwo = document.createElement("mapBTN");

	const centerControl = createCenterControl("cb", "Gizle");
	
  const createFinLoc = createCenterControl("locButton", "");
  const img = document.createElement("img");
  img.setAttribute('src', '../mapicons/konumum.png');
  img.setAttribute('alt', 'Konumumu bul');
  createFinLoc.appendChild(img);
  createFinLoc.addEventListener('click', () => findLocation(map2));

  function findLocation(map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          placeMarker(pos, map2, markers); deleteMarkers(markers);
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
	
	centerControlDiv.appendChild(centerControl);
  centerControlDivTwo.appendChild(createFinLoc);

	map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
  map2.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDivTwo);

  orderData('advices', 'desc');
  map2.addListener('click', (e) => { placeMarker(e.latLng, map2, markers); deleteMarkers(markers); });
  document.getElementById('advices').addEventListener("click", function(e) { orderASC(e.target.id);});
  document.getElementById('su-advice').addEventListener("click", function(e) { orderDESC(e.target.id);});
  document.getElementById('elektrik-advice').addEventListener("click", function(e) { orderDESC(e.target.id);});
  document.getElementById('hayvan-advice').addEventListener("click", function(e) { orderDESC(e.target.id);});
  document.getElementById('diger-advice').addEventListener("click", function(e) { orderDESC(e.target.id);});
}

function showNotificationButton(msg) {
  var notificationButton = document.getElementById("notification");
  notificationButton.classList.add("show-button");
  notificationButton.innerHTML = msg;
  setTimeout(function() {
    notificationButton.classList.remove("show-button");
  }, 10000);
}

function check() {
    var entryTitle = document.getElementById('title').value;
    var entryDesc = document.getElementById('desc').value;
  if(!hasClickedMap) {
    showNotificationButton('Lütfen önce haritada yer seçin!');
    return false;
  }
  else {
    // Transform to lowercase and uppercase the first letter
    entryTitle = entryTitle.toLowerCase().replace(/\b\w/g, function (c) {
      return c.toUpperCase();
    });

    entryDesc = entryDesc.toLowerCase().replace(/\b\w/g, function (c) {
      return c.toUpperCase();
    });

    // Set the modified values back to the input fields
    document.getElementById('title').value = entryTitle;
    document.getElementById('desc').value = entryDesc;

    // Continue with form submission or other actions
    return true;
  }
}

function placeMarker(position, map, markers) {
  if (getLoc(position, map)) {
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });
    map.panTo(marker.position);
    map.setZoom(17);
    placedMarkers.push(marker);
    hasClickedMap = true;
  }
}

async function getLoc(position, map) {
  var lat = getElement("lat");
  var lng = getElement("lng");
  var sName = getElement('street_entry');
  var mName = getElement('mahalle');
  if (lat != null && lng != null) {
    try {
      lat.setAttribute("Value", position.lat());
      lng.setAttribute("Value", position.lng());
      sName.setAttribute("Value", await createStreetName(position.lat(), position.lng()));
    } catch (error) {
      try {
        lat.setAttribute("Value", position.lat);
        lng.setAttribute("Value", position.lng);
        sName.setAttribute("Value", await createStreetName(position.lat, position.lng));
      }
      catch (error) {
        console.error(error);
      }
    }
    return true;
  }
  else { return false;}
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
    setMapOnServer(markers, null);
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
    setMapOnServer(markers, map);
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
  if (placedMarkers.length > 1) {
		placedMarkers[0].setMap(null);
		placedMarkers.shift();
	}
}

function addFetchedMarkers(position, map, title, advice_type) {
	if (advice_type == "Su") {
    return new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          icon: icons[advice_type].icon
      });
  }
  else if (advice_type == "Elektrik") {
    return new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          icon: icons[advice_type].icon
      });
  }
  else if (advice_type == "Hayvan") {
    return new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          icon: icons[advice_type].icon
      });
  }
  else if (advice_type == "Diger") {
    return new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          icon: icons[advice_type].icon
      });
  }
}