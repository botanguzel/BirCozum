<?php
  include('../alt/nav-bar.php');
?>
<!DOCTYPE html>

<html lang="tr">
<head>
  <title>Birçözüm Duyurular</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../scripts/duyurular.js"></script>
  <link rel="stylesheet" href="../styles/duyurular.css">
</head>
<body>


<div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../imgs/bakircay.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../imgs/seyrek.jpeg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../imgs/villakent.jpg" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  
<!-- Slider-->
<hr>

<div class="container py-5">
  <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Duyurular</h1>
      <p class="col-md-8 fs-4">Seyrek ve Villakent mahallelerinde yaşanacak olan gelişmeler.</p>
      <div class="btn-group position-relative" role="group">
        <button type="button" class="infos btn shadow-sm mx-3 p-3 rounded btn-outline-secondary" data-target="info">Su Duyuruları
          <span id="duyCount" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">!</span>
        </button>
        <button type="button" class="infos btn shadow-sm mx-3 p-3 rounded btn-outline-secondary" data-target="info2">Elektrik Duyuruları
          <span id="elCount" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">!</span>
        </button>
      </div>
    </div>
    <div id="info" class="info-section active"></div>
    <div id="info2" class="info-section"></div>
  </div>
</div>

<hr>

</body>
</html>