const adminfetcher = async (type) => {
  try {
    const response = await fetch('../php/fetch.php?type='+type+'&order=desc');
    if (!response.ok) {
      throw new Error('Error fetching entries: ' + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    document.getElementById('notification').innerHTML = error;
    showNotificationButton();
    return [];
  }
};

// Function to add entries to the HTML
async function adminEntries() {
  try {
    const entries = await adminfetcher('entries');
    const advices = await adminfetcher('advices');
      
    // Clear existing content
    $('#leftColIn').empty();
    $('#leftColInS').empty();
    // Iterate through entries and create HTML elements
    entries.forEach((entry) => {
      const { entryID, entry_title, entry_desc, status, createdDate} = entry;
      if (status === 1) { cardCreator('leftColIn', entry_title, entry_desc, 'card-aktiv', entryID, 'entry', createdDate); }
      else { cardCreator('leftColIn', entry_title, entry_desc, 'card-inaktiv', entryID, 'entry', createdDate); }
    });

    advices.forEach((advice) => {
      const { adviceID, advice_title, advice_desc, status, createdDate} = advice;
      if (status == true) { cardCreator('leftColInS', advice_title, advice_desc, 'card-aktiv', adviceID, 'advice', createdDate); }
      else { cardCreator('leftColInS', advice_title, advice_desc, 'card-inaktiv', adviceID, 'advice', createdDate); }
    });

  } catch (error) {
    document.getElementById('notification').innerHTML = error;
    showNotificationButton();
  }
}

function Menu(type, entryID) {

  // Create the menu element
  const menu = document.createElement('div');
  menu.classList.add('menu');
  menu.classList.add('shadow');
  menu.classList.add('rounded-lg');

  fetch('hesabimMenu.php?entryID=' + entryID + '&type=' + type)
  .then(response => response.text())
  .then(content => {
    // Insert the PHP file content into the menu
    menu.innerHTML += content;
  })
  .catch(error => {
    document.getElementById('notification').innerHTML = error;
    showNotificationButton();
  });
        // Calculate the top position to center the menu
        const windowHeight = window.innerHeight;
        const menuHeight = menu.offsetHeight;
        const top = Math.max(0, (windowHeight - (menuHeight)) / 2);
  
        // Set the top position of the menu
        menu.style.top = `${top/2}px`;
  // Append the menu to the document body
  document.body.appendChild(menu);
  
  // Block scrolling while the menu is open
  document.body.style.overflow = 'hidden';

  // Blur the background
  const elementsToBlur = document.querySelectorAll('body > *:not(.menu)');
  elementsToBlur.forEach((element) => {
    element.style.filter = 'blur(5px)';
  });
  // Close the menu when clicking outside of it
  document.body.addEventListener('mousedown', handleMouseDown);
  function handleMouseDown(event) {
    if (!menu.contains(event.target)) {
      document.body.removeEventListener('mousedown', handleMouseDown);
      setTimeout(() => {
        removeMenu();
      }, 0);
    }
  }
}

function removeMenu() {
  // Remove the menu from the DOM
  const menu = document.querySelector('.menu');
  menu.parentNode.removeChild(menu);

  // Unblur the background
  const elementsToUnblur = document.querySelectorAll('body > *:not(.menu)');
  elementsToUnblur.forEach((element) => {
    element.style.filter = 'none';
  });
}

document.addEventListener('submit', function(event) {
  
  event.preventDefault(); // Prevent form submission
  var response;
  var form = event.target;
  var formData = new FormData(form);
  var url;
  if (event.target.parentNode.id == 'remove') {
    // Check if the form button with type value "entryRemove" was clicked
    if (formData.get('type') === 'entry') {
      var entryID = formData.get('entryID');
      formData.append('type', 'entryRemove'); // Add the "type" field to the form data
      formData.append('entryID', entryID);
      url = '../php/fetch.php?type=entryRemove&entryID=' + entryID;
    }
    else if (formData.get('type') === 'advice') {
      var entryID = formData.get('entryID');
  
      formData.append('type', 'adviceRemove'); // Add the "type" field to the form data
      formData.append('entryID', entryID);
      url = '../php/fetch.php?type=adviceRemove&entryID=' + entryID;
    }
    else { url = 'error'; response = 'Invalid Request';}
  }
  else if (event.target.parentNode.id === 'edit') {
    if (formData.get('type') === 'entry') {
      var entryID = formData.get('entryID');
      var newTitle = formData.get('newtitle');
      var newDesc = formData.get('newdesc');
      var state = formData.get('status');
      if (state === "on") {state = 1;}
      else {state = 0;}
      formData.append('type', 'entryEdit'); // Add the "type" field to the form data
      formData.append('entryID', entryID);
      formData.append('newtitle', newTitle);
      formData.append('newtitle', newDesc);
      formData.append('status', state);
      url = '../php/fetch.php?type=entryEdit&entryID=' + entryID;
    }
    else if (formData.get('type') === 'advice') {
      var entryID = formData.get('entryID');
      var newTitle = formData.get('newtitle');
      var newDesc = formData.get('newdesc');
      var state = formData.get('status');
      if (state === "on") {state = 1;}
      else {state = 0;}
      formData.append('type', 'entryEdit'); // Add the "type" field to the form data
      formData.append('entryID', entryID);
      formData.append('newtitle', newTitle);
      formData.append('newtitle', newDesc);
      formData.append('status', state);
      url = '../php/fetch.php?type=adviceEdit&entryID=' + entryID;
    }
  }
  if (url === 'error') {
    response = 'Invalid URL';
  }
  else {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Request was successful
          response = xhr.responseText;
          // Handle the response data as needed
          document.getElementById('notification').innerHTML = response;
          showNotificationButton();
        } else {
          // Request failed
          document.getElementById('notification').innerHTML = xhr.status;
          showNotificationButton();
        }
      }
    };
    xhr.open('POST', url);
    xhr.send(formData);
  }
  removeMenu();
  document.getElementById('notification').innerHTML = response;
  adminEntries();
});
function cardCreator(divName, entry_title, entry_desc, className, entryID, type, date) {
  const htmlEntries = document.createElement('div');
  const dateDiv = document.createElement('div');
  const htmlDesc = document.createElement('h3');
  const htmlTitle = document.createElement('h1');
  const htmlButton = document.createElement('button');

  htmlEntries.classList.add(className);
  dateDiv.classList.add('comment-author');

  htmlTitle.innerHTML = entry_title;
  htmlDesc.innerHTML = entry_desc;
  dateDiv.innerHTML = date;
  htmlButton.innerHTML = "Düzenle";
  htmlButton.classList.add("cardButton");
  if (type.includes('entry')) {
    htmlButton.addEventListener('click', () => Menu(type, entryID));
  }
  else if (type.includes('advice')) {
    htmlButton.addEventListener('click', () => Menu(type, entryID));
  }
  document.getElementById(divName).appendChild(htmlEntries);
  htmlEntries.appendChild(dateDiv);
  htmlEntries.appendChild(htmlTitle);
  htmlEntries.appendChild(htmlDesc);
  htmlEntries.appendChild(htmlButton);
}

function lockScreen() {
    const not = document.getElementById('notification');
    const clonedNotification = not.cloneNode(true);
    const loader = document.createElement('div');
    loader.classList.add('loader', 'super-loader');
    const face = document.createElement('div');
    face.classList.add('face');
    const circle= document.createElement('div');
    circle.classList.add('circle');
    const face1 = document.createElement('div');
    face1.classList.add('face');
    const circle1= document.createElement('div');
    circle1.classList.add('circle');
    face.appendChild(circle);
    face1.appendChild(circle1);
    loader.appendChild(face);
    loader.appendChild(face1);
    const menu = document.createElement('div');
    menu.classList.add('menu');
    menu.classList.add('shadow');
    menu.classList.add('rounded-lg');
    document.body.appendChild(menu);
    menu.appendChild(loader);
    clonedNotification.innerHTML = "Lütfen Bekleyiniz!";
    clonedNotification.classList.add('super-notification');
    menu.appendChild(clonedNotification);
    
    // Block scrolling while the menu is open
    document.body.style.overflow = 'hidden';
  
    // Blur the background
    const elementsToBlur = document.querySelectorAll('body > *:not(.menu)');
    elementsToBlur.forEach((element) => {
      element.style.filter = 'blur(5px)';
    });
  }
  
  function removeMenu() {
    // Remove the menu from the DOM
    const menu = document.querySelector('.menu');
    menu.parentNode.removeChild(menu);
  
    // Unblur the background
    const elementsToUnblur = document.querySelectorAll('body > *:not(.menu)');
    elementsToUnblur.forEach((element) => {
      element.style.filter = 'none';
    });
    adminEntries();
  }  

function deleteAndResetTable(type, db) {
    // Send an AJAX request to execute the PHP code
    const url = '../php/super.php?type='+type+'&db='+db
    const xhr = new XMLHttpRequest();
    lockScreen();
    document.body.classList.add('block');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Request was successful
          response = xhr.responseText;
          // Handle the response data as needed
          document.getElementById('notification').innerHTML = response;
          showNotificationButton();
        } else {
          // Request failed
          document.getElementById('notification').innerHTML = xhr.status;
          showNotificationButton();
        }
        removeMenu();
        document.body.classList.remove('block');
      }
    };
    xhr.open('POST', url);
    xhr.send();
  }

  $(document).ready(function () {
    adminEntries();
});

document.addEventListener('DOMContentLoaded', function() {
  // Get references to the buttons
  var duyButton = document.getElementById('duy');
  var elButton = document.getElementById('el');
  var updateButton = document.getElementById('updateEl');

  // Add event listeners to the buttons
  duyButton.addEventListener('click', function() {
    deleteAndResetTable('del', 'duyurular');
  });

  elButton.addEventListener('click', function() {
    deleteAndResetTable('del', 'elektrik_duyurular');
  });  
});
  