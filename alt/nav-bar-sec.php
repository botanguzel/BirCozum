<div>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
  <nav class="navbar navbar-expand-lg  fixed-top" style="background-color:#9A9CEA; " >
    <div class="container-fluid">
      <a class="navbar-brand" style="color:#ffffff;"href="../index.php">BirCözüm</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav" >
        <ul class="navbar-nav" > 
          <li class="nav-item">
            <a class="nav-link" style="color:#ffffff;" href="./index.php#section1">Duyurular</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"style="color:#ffffff;" href="./index.php#section2">Şikayetler</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"style="color:#ffffff;" href="./index.php#section3">Öneriler</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"style="color:#ffffff;" href="./php/sikayetler.php">Şikayetler/Detaylı</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="color:#ffffff;"href="./php/öneriler.php">Öneriler/Detaylı</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="color:#ffffff;"href="./alt/duyurular.php">Duyurular/Detaylı</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"style="color:#ffffff;" href="./php/grafik.php">İstatistikler</a>
          </li>
        </ul>
      </div>
      <ul class="navbar-nav ms-auto">
        <?php
        if(isset($_SESSION['loggedin'])){
            echo '<li class="nav-item"><a class="nav-link"style="color:#ffffff;" href="../php/logout.php"><i class="bi bi-box-arrow-left"></i> Çıkış Yap </a></li>';
            echo '<li class="nav-item"><a class="nav-link" style="color:#ffffff;"href="../php/hesabim.php"><i class="bi bi-person-fill"></i>Hesabım </a></li>';
        }
        else {
            echo '<li class="nav-item"><a style="color:#ffffff;"id="regElement" class="nav-link" href="../alt/register.html"><i class="bi bi-person-fill"></i> Kayıt Ol </a></li>';
            echo '<li class="nav-item"><a style="color:#ffffff;"class="nav-link" href="../alt/login.html"><i class="bi bi-box-arrow-in-right"></i> Giriş Yap </a></li>';
        }
        ?>
      </ul>
    </div>
  </nav>
</div>
