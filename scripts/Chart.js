let su = [];
let elektrik = [];
let hayvan = [];
let diger = [];
let pie = [];
let street_names = [];
let street_names_best = [];
let pairs = [];
let pairs_best = [];
let worstSu = [];
let worstElektrik = [];
let worstHayvan = [];
let worstDiger = [];
let mNames = ['Gazi Mustafa Kemal Mahallesi', 'İnönü Mahallesi', 'Villakent Mahallesi'];
let mahallePairs = [];

// Çizgi Grafiği
var ctx = document.getElementById('lineChart').getContext('2d');
var lineChart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [
      {
          label: 'Su Şikayetleri',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
      },
      {
          label: 'Elektrik  Şikayetleri',
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
      },
      {
          label: 'Hayvan  Şikayetleri',
          data: [],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 2
      },
      {
          label: 'Diğer  Şikayetler',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2
      }
    ]
  }
});


var ctx = document.getElementById('pieChart').getContext('2d');
var pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Su', 'Elektrik', 'Hayvan', 'Diğer'],
        datasets: [{
            data: [0,0,0,0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 3
        }]
    }
});

// Get the canvas element
var ctx = document.getElementById('barChart').getContext('2d');

// Create the bar chart
var barChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: mNames,
      datasets: [
          {
              label: 'Su',
              data: [],
              backgroundColor: 'rgba(0, 191, 255, 0.7)',
              borderColor: 'rgba(0, 191, 255, 1)',
              borderWidth: 1,
              stack: 'stack 0'
          },
          {
              label: 'Elektrik',
              data: [],
              backgroundColor: 'rgba(255, 165, 0, 0.7)',
              borderColor: 'rgba(255, 165, 0, 1)',
              borderWidth: 1,
              stack: 'stack 0'
          },
          {
              label: 'Hayvan',
              data: [],
              backgroundColor: 'rgba(0, 128, 0, 0.7)',
              borderColor: 'rgba(0, 128, 0, 1)',
              borderWidth: 1,
              stack: 'stack 0'
          },
          {
              label: 'Diger',
              data: [],
              backgroundColor: 'rgba(128, 0, 128, 0.7)',
              borderColor: 'rgba(128, 0, 128, 1)',
              borderWidth: 1,
              stack: 'stack 0'
          },
      ]
  },
  options: {
    scales: {
        x: {
            stacked: true,
        },
        y: {
            beginAtZero: true,
        }
    }
  }
});


let isRunning = false; // Flag variable to track the execution status


async function orderData() {
    try {
        const [entries, pieEnt, worst, best] = await Promise.all([
            fetcher('line'),
            fetcher('pie'),
            fetcher('worst'),
            fetcher('best'),
        ]);
        const data = entries;
        data.forEach(entry => {
            const { entry_type, count, date } = entry;
            if (entry_type === 'Su') {
              su.push({ count, date });
            } else if (entry_type === 'Elektrik') {
              elektrik.push({ count, date });
            } else if (entry_type === 'Hayvan') {
              hayvan.push({ count, date });
            } else if (entry_type === 'Diger') {
              diger.push({ count, date });
            }
          });
        pieEnt.forEach(entry => {
            pie.push(entry.count);
        });
        worst.forEach(entry => {
          street_names.push(entry.street_name);
        })
        best.forEach(entry => {
            street_names_best.push(entry.street_name);
        })
      } catch (error) {
        console.error('Error adding advice:', error);
      }
      const promises = street_names.map(street => fetcher('worstAlt', street));
      const promisesBest = street_names_best.map(street => fetcher('bestAlt', street));
      const promiseMahalle = mNames.map(mah => fetcher('mahalle', mah));

      await Promise.all(promiseMahalle)
        .then(result => {
          mahallePairs.push(result);
        })
        .catch(error => {
          console.error(error);
        });

      await Promise.all(promises)
        .then(results => {
          pairs.push(results);
        })
        .catch(error => {
          console.error(error);
        });

        await Promise.all(promisesBest)
        .then(results => {
          pairs_best.push(results);
        })
        .catch(error => {
          console.error(error);
        });

        let i = 1;
        let b = 0;
        pairs[0].forEach(item => {
          let mainID = "main-name-"+i;
          document.getElementById(mainID).innerHTML = street_names[i-1];
          item.forEach(elmnt => {

            if (elmnt.entry_type === "Su") {
              worstSu.push(elmnt.count);
            }
            else if (elmnt.entry_type === "Elektrik") {
              worstElektrik.push(elmnt.count);
            }
            else if (elmnt.entry_type === "Hayvan") {
              worstHayvan.push(elmnt.count);
            }
            else if (elmnt.entry_type === "Diger") {
              worstDiger.push(elmnt.count);
            }

            let id = "ac-"+i+"-content";  
            document.getElementById(id).innerHTML += elmnt.entry_type +": "+ elmnt.count + " | ";
          });
          b++
          i++
        });

        let y = 1;
        pairs_best[0].forEach(item => {
          let mainIDlow = "low-name-"+y;
          document.getElementById(mainIDlow).innerHTML = street_names_best[y-1];
          console.log(mainIDlow);
          item.forEach(elmnt => {
            let id = "low-"+y+"-content";  
            document.getElementById(id).innerHTML += elmnt.entry_type +": "+ elmnt.count + " | ";
          });
          y++
        });        
        console.log(mahallePairs);
}

function createList(mode, street, count, type) {
    const streets = document.createElement('li');
    const card = document.createElement('div');
    card.classList.add('card');
    streets.appendChild(card);
    if (mode === 'best') {
        card.innerHTML = type + street+': '+count;
        document.getElementById('iyi').appendChild(streets);
    }
    else if (mode === 'worst') {
        card.innerHTML = type + street+': '+count;
        document.getElementById('kötü').appendChild(streets);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

const fetcher = (type, streetName) => {
    var url = "";
    if (streetName == null) { url = "../php/fetch.php?type="+type; }
    else { url = "../php/fetch.php?type="+type+"&street_name="+streetName }
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(response) {
          resolve(response);
        },
        error: function(xhr, status, error) {
          reject(error);
        }
      });
    });
  };
  
  document.addEventListener('DOMContentLoaded', async function() {
    await orderData();
    su.forEach(entry => {
        lineChart.data.datasets[0].data.push(entry.count);
      });
    elektrik.forEach(entry => {
        lineChart.data.datasets[1].data.push(entry.count);
    });
    hayvan.forEach(entry => {
        lineChart.data.datasets[2].data.push(entry.count);
    });
    diger.forEach(entry => {
        lineChart.data.datasets[3].data.push(entry.count);
        lineChart.data.labels.push(entry.date);
    });

    mahallePairs.forEach(entry => {
      barChart.data.datasets[3].data.push(entry[0][0].count);
      barChart.data.datasets[3].data.push(entry[1][0].count);
      barChart.data.datasets[3].data.push(entry[2][0].count);

      barChart.data.datasets[2].data.push(entry[0][2].count);
      barChart.data.datasets[2].data.push(entry[1][2].count);
      barChart.data.datasets[2].data.push(entry[2][2].count);

      barChart.data.datasets[1].data.push(entry[0][1].count);
      barChart.data.datasets[1].data.push(entry[1][1].count);
      barChart.data.datasets[1].data.push(entry[2][1].count);

      barChart.data.datasets[0].data.push(entry[0][3].count);
      barChart.data.datasets[0].data.push(entry[1][3].count);
      barChart.data.datasets[0].data.push(entry[2][3].count);
    })
    barChart.update();

    lineChart.update();
    pieChart.data.datasets[0].data = pie;
    pieChart.update();

});