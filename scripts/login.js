document.getElementById("btn").addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    var form = event.target;
    var formData = new FormData(form);
    console.log(formData);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Request was successful
          var response = xhr.responseText;
          // Handle the response data as needed
          document.getElementById('notification').innerHTML = response;
          showNotificationButton();
        } else {
          // Request failed
          document.getElementById('notification').innerHTML = 'Error: ' + xhr.status;
          showNotificationButton();
        }
      }
    };
  
    xhr.open('POST', 'root/php/register.php');
    xhr.send(formData);
  
    // Display form field values
    var display = document.getElementById('formValues');
    display.innerHTML = ''; // Clear previous content
  
    formData.forEach(function(value, key) {
      display.innerHTML += key + ': ' + value + '<br>';
    });
    return false;
  });
  function handleLoginData(data) {
    // Use the data received from onClickHandler
    // Perform the necessary actions with the data
    
    console.log("Data: " + data.password);
    //console.log('Full Name: ' + data.name);
    //console.log('Given Name: ' + data.given_name);
    //console.log('Family Name: ' + data.family_name);
    //console.log("Image URL: " + data.picture);
    //console.log("Email: " + data.email);
    var formData = {
      username: data.name,
      firstName: data.given_name,
      lastName: data.family_name,
      email: data.email
    };
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../php/register.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Request successful
        console.log(xhr.response);
        // Handle the response from the PHP file if needed
      }
    };
    var encodedData = Object.keys(formData).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
    }).join('&');
  
    // Send the encoded data
    xhr.send(encodedData);
    // Call other functions or perform additional operations with the data
  }