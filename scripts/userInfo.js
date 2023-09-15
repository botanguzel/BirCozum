const fetchUserInfo = async () => {
    try {
        const response = await fetch('../php/fetch.php?type=user');
        if (!response.ok) {
        throw new Error('Error fetching user info: ' + response.status);
        }
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error fetching user info:', error);
        return [];
    }
};

// Function to add entries to the HTML
async function loadPage(map, type) {
  try {
    const userInfo = await fetchUserInfo();
    const username = userInfo.username;
    const email = userInfo.email;
    const fname = userInfo.firstName;
    const lname = userInfo.lastName;
    $('#kullanici').html(username);
    $('#firstName').val(fname);
    $('#lastName').val(lname);
    $('#email').val(email);   

  } catch (error) {
    console.error('Error adding entries:', error);
  }
}

$(document).ready(function () {
    loadPage();
});