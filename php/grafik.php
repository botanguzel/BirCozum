<?php
  include('../alt/nav-bar.php');
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grafiğim</title>
    <link rel="stylesheet" href="../styles/graphs.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <div class="top">
                    <div class="linechart">
                        <canvas id="lineChart"></canvas> <!-- Çizgi grafiği buraya çizdireceğiz -->
                    </div>
                    <div class="chart mt-2">
                        <canvas id="barChart"></canvas> <!-- Bar grafiği buraya çizdireceğiz -->
                    </div>

                </div>
            </div>
            <div class="col-sm-4">
                <div class="bottom">
                    <div class="piechart">
                        <canvas id="pieChart"></canvas>
                    </div>
                    <script src="../scripts/Chart.js"></script>
                    <div class="chart mt-2">
                        <div id="accordionCarousel" class="carousel carousel-dark slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                        <div class="list">
                                            <ul id="kötü" style="padding-right: 32px;">
                                                <h3>Şikayetin yoğun olduğu sokaklar</h3>
                                                <div class="accordion accordion-flush" id="accordionFlushExample">
                                                    <!-- Accordion Item 1 -->
                                                    <div class="accordion-item">
                                                        <h1 class="accordion-header" id="flush-headingOne">
                                                        <button id="main-name-1" style="font-size: 20px" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                            Accordion Item 1
                                                        </button>
                                                        </h1>
                                                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                            <div id="ac-1-content" class="accordion-body">| </div>
                                                        </div>
                                                    </div>

                                                    <!-- Accordion Item 2 -->
                                                    <div class="accordion-item">
                                                        <h1 class="accordion-header" id="flush-headingTwo">
                                                        <button id="main-name-2" style="font-size: 20px" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                            Accordion Item 2
                                                        </button>
                                                        </h1>
                                                        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                                            <div id="ac-2-content" class="accordion-body">| </div>
                                                        </div>
                                                    </div>

                                                    <!-- Accordion Item 3 -->
                                                    <div class="accordion-item">
                                                        <h1 class="accordion-header" id="flush-headingThree">
                                                        <button id="main-name-3" style="font-size: 20px" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                                            Accordion Item 3
                                                        </button>
                                                        </h1>
                                                        <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                                            <div id="ac-3-content" class="accordion-body">| </div>
                                                        </div>
                                                    </div>

                                                    <!-- Accordion Item 4 -->
                                                    <div class="accordion-item">
                                                        <h1 class="accordion-header" id="flush-headingFour">
                                                        <button id="main-name-4" style="font-size: 20px" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                                            Accordion Item 4
                                                        </button>
                                                        </h1>
                                                        <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                                            <div id="ac-4-content" class="accordion-body">| </div>
                                                        </div>
                                                    </div>
                                                    <div class="accordion-item">
                                                        <h1 class="accordion-header" id="flush-headingFive">
                                                        <button id="main-name-5" style="font-size: 20px" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                                                            Accordion Item 4
                                                        </button>
                                                        </h1>
                                                        <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                                                            <div id="ac-5-content" class="accordion-body">| </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                </div>
                                <div class="carousel-item">
                                        <div class="list">
                                            <ul id="iyi" style="padding-right: 32px;">
                                                <h3>Şikayetin az olduğu sokaklar</h3>
                                                <div class="accordion accordion-flush" id="accordionFlushExampleBest">
                                                    <div class="accordion-item">
                                                        <h1 class="accordion-header" id="flush-headingSix">
                                                        <button id="low-name-1" style="font-size: 20px" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                                                            Accordion Item 4
                                                        </button>
                                                        </h1>
                                                        <div id="flush-collapseSix" class="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExampleBest">
                                                            <div id="low-1-content" class="accordion-body">| </div>
                                                        </div>
                                                    </div>
                                                    <!------------->
                                                    <div class="accordion-item">
                                                        <h1 class="accordion-header" id="flush-headingSeven">
                                                        <button id="low-name-2" style="font-size: 20px" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                                                            Accordion Item 4
                                                        </button>
                                                        </h1>
                                                        <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExampleBest">
                                                            <div id="low-2-content" class="accordion-body">| </div>
                                                        </div>
                                                    </div>
                                                    <!------------->
                                                    <div class="accordion-item">
                                                        <h1 class="accordion-header" id="flush-headingEight">
                                                        <button id="low-name-3" style="font-size: 20px" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                                                            Accordion Item 4
                                                        </button>
                                                        </h1>
                                                        <div id="flush-collapseEight" class="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExampleBest">
                                                            <div id="low-3-content" class="accordion-body">| </div>
                                                        </div>
                                                    </div>
                                                    <!------------->
                                                    <div class="accordion-item">
                                                        <h1 class="accordion-header" id="flush-headingNine">
                                                        <button id="low-name-4" style="font-size: 20px" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
                                                            Accordion Item 4
                                                        </button>
                                                        </h1>
                                                        <div id="flush-collapseNine" class="accordion-collapse collapse" aria-labelledby="flush-headingNine" data-bs-parent="#accordionFlushExampleBest">
                                                            <div id="low-4-content" class="accordion-body">| </div>
                                                        </div>
                                                    </div>
                                                    <!------------->
                                                    <div class="accordion-item">
                                                        <h1 class="accordion-header" id="flush-headingTen">
                                                        <button id="low-name-5" style="font-size: 20px" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTen" aria-expanded="false" aria-controls="flush-collapseTen">
                                                            Accordion Item 4
                                                        </button>
                                                        </h1>
                                                        <div id="flush-collapseTen" class="accordion-collapse collapse" aria-labelledby="flush-headingTen" data-bs-parent="#accordionFlushExampleBest">
                                                            <div id="low-5-content" class="accordion-body">| </div>
                                                        </div>
                                                    </div>
                                                    <!------------->
                                                </div>
                                            </ul>
                                        </div>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#accordionCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#accordionCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
