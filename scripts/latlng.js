function getAddressFromLatLng(lat, lng) {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(lat, lng);
  
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            const addressComponents = results[0].address_components;
            let streetName = '';
            console.log(results);
            for (let i = 0; i < addressComponents.length; i++) {
              const component = addressComponents[i];
              const types = component.types;
  
              if (types.includes('route')) {
                streetName = component.long_name;
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
  
  function initialize() {
    const lat = 38.6064729742;
    const lng = 26.9605976188;
  
    getAddressFromLatLng(lat, lng)
      .then((streetName) => {
        document.getElementById('test').textContent = streetName;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  