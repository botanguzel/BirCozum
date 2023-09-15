$query = "SELECT entry_type, DATE(createdDate) as date, COUNT(*) as count FROM table_name GROUP BY date, entry_type ORDER BY date ASC";
$result = mysqli_query($conn, $query);
$data = array();
while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
<script>
var data = <?php echo json_encode($data); ?>;

// Veri setlerini oluştur
var datasets = [];
var types = [...new Set(data.map(item => item.entry_type))];
types.forEach(type => {
    datasets.push({
        label: type,
        data: data.filter(item => item.entry_type == type).map(item => item.count),
        fill: false,
        borderColor: '#' + Math.floor(Math.random()*16777215).toString(16),  // random renk
        tension: 0.1
    });
});

// Çizgi Grafiği
var ctx = document.getElementById('lineChart').getContext('2d');
var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [...new Set(data.map(item => item.date))],
        datasets: datasets
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        }
    }
});
</script>






PASTA GRAFİĞİ
$query = "SELECT entry_type, COUNT(*) as count FROM table_name GROUP BY entry_type";
$result = mysqli_query($conn, $query);
$data_pie = array();
while($row = mysqli_fetch_assoc($result)) {
    $data_pie[] = $row;
}

<script>
var data_pie = <?php echo json_encode($data_pie); ?>;

// Pasta Grafiği
var ctx_pie = document.getElementById('pieChart').getContext('2d');
var pieChart = new Chart(ctx_pie, {
    type: 'pie',
    data: {
        labels: data_pie.map(item => item.entry_type),
        datasets: [{
            data: data_pie.map(item => item.count),
            backgroundColor: data_pie.map(item => '#' + Math.floor(Math.random()*16777215).toString(16)),  // random renk
        }]
    }
});
</script>
 <canvas id="pieChart"></canvas> <!-- Pasta grafiği buraya çizdireceğiz -->
