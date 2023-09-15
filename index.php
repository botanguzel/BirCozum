<?php
  include('./alt/nav-bar.php');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Bir Çözüm</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <!-- Bootstrap icons-->
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="../styles/style.css" rel="stylesheet" />
    </head>
    <body class="d-flex flex-column h-100">
        <main class="flex-shrink-0">
            <!-- Navigation-->
            <!-- Header-->
            <header class="bg-dark py-5">
                <div class="container px-5">
                    <div class="row gx-5 align-items-center justify-content-center">
                        <div class="col-lg-8 col-xl-7 col-xxl-6">
                            <div class="my-5 text-center text-xl-start">
                                <h1 class="display-5 fw-bolder text-white mb-2">Mahallende yaşadığın sorunları paylaş</h1>
                                <p class="lead fw-normal text-white-50 mb-4">Birçözüm insanların ikamet ettiği alanlarda yaşadığı sorunları topluluk ile paylaşarak farkındalık yaratmasına olanak sağlar.</p>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <a class="btn btn-primary btn-lg px-4 me-sm-3" href="../alt/register.html">Üye Ol</a>
                                    <a class="btn btn-outline-light btn-lg px-4" href="../php/sikayetler.php">Şikayette Bulun</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img class="img-fluid rounded-3 my-5" src="../logo.png"></div>
                    </div>
                </div>
            </header>
            <!-- Features section-->
            <section class="py-5" id="features">
                <div class="container px-5 my-5">
                    <div class="row gx-5">
                        <div class="col-lg-4 mb-5 mb-lg-0"><h2 class="fw-bolder mb-0">Birçözüm ile yapabileceklerin </h2></div>
                        <div class="col-lg-8">
                            <div class="row gx-5 row-cols-1 row-cols-md-2">
                                <div class="col mb-5 h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3 h3">
                                        <i class="bi bi-share-fill" style="padding-left: 3px;"> Sorun Paylaş </i>
                                    </div>
                                    <p class="mb-0 h5">Birçözüm kullanarak mahallende yaşadığın sorunu paylaşabilir ve paylaştığın sorunu ve çevredeki sorunları görselleştirilmiş harita sayesinde görebilirsin.</p>
                                </div>
                                <div class="col mb-5 h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3 h3">
                                        <i class="bi bi-share-fill" style="padding-left: 3px;"> Öneri Paylaş </i>
                                    </div>
                                    <p class="mb-0 h5">Yaşanan sorunlara çözüm önerisi sunabilir veya iyileştirme talebini görselleştirilmiş harita ile gösterebilirsin.</p>
                                </div>
                                <div class="col mb-5 mb-md-0 h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3 h3">
                                        <i class="bi bi-graph-up" style="padding-left: 3px;"> İstatistikleri Gör </i>
                                    </div>
                                    <p class="mb-0 h5">Bölgenizdeki sorunlar hakkında fikir sahibi olmak için istatistikler bölümünden bilgi edinebilirsiniz.</p>
                                </div>
                                <div class="col h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3 h3">
                                        <i class="bi bi-pencil-square" style="padding-left: 3px;"> Kayıtlarını Güncelle </i>
                                    </div>
                                    <p class="mb-0 h5">Ayrıca girdiğiniz şikayet ve önerilerizin çözüme ulaşıp ulaşmadığını diğer insanlarla paylaşabilirsiniz.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Testimonial section-->
            <div class="py-5 bg-light">
                <div class="container px-5 my-5">
                    <div class="row gx-5 justify-content-center">
                        <div class="col-lg-10 col-xl-7">
                            <div class="text-center">
                                <div class="fs-4 mb-4 fst-italic">"Halkı bir tek insan, bir tek insanı da bütün halk gibi gör."</div>
                                <div class="d-flex align-items-center justify-content-center">
                                    <div class="fw-bold"> Montaigne </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </section>
        </main>
        <?php include_once('./alt/footer.php'); ?>
    </body>
</html>
