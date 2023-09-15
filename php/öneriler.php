<?php
  include('../alt/nav-bar.php');
?>
<!DOCTYPE html>
<html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="../styles/style.css">
    <link rel="stylesheet" href="../styles/popup.css">
    <link rel="stylesheet" href="../styles/select.css">
    <link rel="stylesheet" href="../styles/sikayetler.css">

    </head>

    <body>
        <div class="header">
          <h2>Öneriler</h2>
        </div>
        <div id="section2" class="container-fluid card">
          <div class="container">
            <div class="rowMe">
              
              <div id="map" class="leftcolumn" style="background-color:#673ab7; height:30vh;"></div>
              <button id="notification" class="button">
                <svg viewBox="0 0 448 512" class="bell"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
                  Notifications
              </button>
              <script type="text/javascript" src="../scripts/öneriler.js"></script>
              <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFZlWKyMzUMWVFlrfL2q5vJz7BUtj3Kzc&callback=initMap"> </script>

              <div class="rightcolumn" style="background-color:gray; height:30vh;">
                <div class="maindiv">
                  <div class="text-center">
                    <h1 class="login">Öneride Bulun</h1>
                  </div>

                  <?php
                      if(isset($_SESSION['loggedin'])){
                        echo '<form method="post" action="../php/reg_entry.php">
                        <input type="hidden" name="form_type" value="advice">
                        <select name="advice_type" required>
                          <option value="Su"> Su </option>
                          <option value="Elektrik"> Elektrik </option>
                          <option value="Hayvan"> Hayvan </option>
                          <option value="Diger"> Diğer </option>
                        </select>
                        <input id="title" name="advice_title" class="formtype" type="text" class="form-control-login" placeholder="Başlık" required pattern="^[a-zA-Z.! ]{2,80}"
                        title="Lütfen 2-40 karakter sınırlarına uyunuz, sadece (. ve ! sembolleri kullanılabilir)">
                        <input id="desc" name="advice_desc" class="formtype" type="text" class="form-control-login" placeholder="Açıklama" required pattern="^[a-zA-Z.! ]{5,80}"
                        title="Lütfen 5-40 karakter sınırlarına uyunuz, sadece (. ve ! sembolleri kullanılabilir)">
                        <input id="lat" name="lat1" class="formtype" type="hidden" class="form-control-login" required>
                        <input id="lng" name="lng1" class="formtype" type="hidden" class="form-control-login" required>
                        <input id="street_entry" name="street_name_advice" class="formtype form-control-login" type="hidden" required>
                        <input type="submit" value="gönder" onclick="return check();">
                        
                      </form>';
                      }
                      else {
                        echo '<button style="color:black;" onclick="window.location.href=\'../alt/login.html\'"> Giris Yap </button>';
                      }
                    ?>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="leftColIn">
          <div class="card">
            <div class="btn-group position-relative row" role="group">
              <div class="col-12 col-md-6 col-lg-auto mb-3">
                <button id="advices" class="entry_type btn shadow-sm mx-3 p-3 rounded btn-outline-secondary"><i class="bi bi-arrow-down"></i>Toplam öneri sayısı</button>
                <button id="su-advice" class="entry_type btn shadow-sm mx-3 p-3 rounded btn-outline-secondary"><i class="bi bi-arrow-down"></i>Su önerileri</button>
                <button id="elektrik-advice" class="entry_type btn shadow-sm mx-3 p-3 rounded btn-outline-secondary"><i class="bi bi-arrow-down"></i>Elektrik önerileri</button>
                <button id="hayvan-advice" class="entry_type btn shadow-sm mx-3 p-3 rounded btn-outline-secondary"><i class="bi bi-arrow-down"></i>Hayvan önerileri</button>
                <button id="diger-advice" class="entry_type btn shadow-sm mx-3 p-3 rounded btn-outline-secondary"><i class="bi bi-arrow-down"></i>Diğer öneriler</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
            <div id="leftcol" class="leftcolumn">
              <div id="leftColIn" class="leftColIn" style="margin-left:15px;">
              </div>
            </div>
            <div class="rightcolumn">
                <div class="card" style="position: sticky; top: 120px;">
                    <div id="map3" style="background-color:#673ab7; height:70vh;"></div>
                </div>
            </div>
          </div>
    </body>
</html>