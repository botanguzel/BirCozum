<?php
  session_start();
  ?>
<!DOCTYPE html>
<html>
<head>

      <!-- Favicon-->
      <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <!-- Bootstrap icons-->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">

</head>

<body>
<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div class="container px-5">
                    <a class="navbar-brand" href="../index.php">Bir Çözüm</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item"><a class="nav-link" href="../index.php">Ana Sayfa</a></li>
                            <li class="nav-item"><a class="nav-link" href="../php/öneriler.php">Öneri</a></li>
                            <li class="nav-item"><a class="nav-link" href="../php/sikayetler.php">Şikayet</a></li>
                            <li class="nav-item"><a class="nav-link" href="../alt/Duyurular.php">Duyurular</a></li>
                            <li class="nav-item"><a class="nav-link" href="../php/grafik.php">İstatistik</a></li>
                            <?php
                            if(isset($_SESSION['loggedin'])){
                                echo '<li class="nav-item"><a class="nav-link" style="color:white;" href="../php/logout.php"> Çıkış Yap </a> </li>';
                                echo '<li class="nav-item"><a class="nav-link" style="color:white;" href="../php/hesabim.php"> Hesabım </a> </li>';
                            }
                            else {
                                echo '<li class="nav-item"><a id="regElement" class="nav-link" style="color:white;" href="../alt/register.html"> Kayıt Ol </a> </li>';
                                echo '<li class="nav-item"><a class="nav-link" style="color:white;" href="../alt/login.html"> Giriş Yap </a> </li>';
                            }
                            ?>
                        </ul>
                    </div>
                </div>
            </nav>
            <body>

            </html>