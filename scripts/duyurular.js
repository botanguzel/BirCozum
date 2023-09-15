const fetchDuyurular = async (type) => {
    try {
        const response = await fetch('../php/fetch.php?type='+type);
        if (!response.ok) {
        throw new Error('Error fetching duyurular: ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching duyurular:', error);
        return [];
    }
};

function capitalize(inputString) {
  var words = inputString.split(' ');

  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  var capitalizedString = words.join(' ');

  return capitalizedString;
}

function createCards(title, text, date) {
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardText = document.createElement('p');
    const cardFooter = document.createElement('div');
    card.classList.add('card');
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-header');
    cardText.classList.add('card-text');
    cardFooter.classList.add('card-footer', 'text-muted');
    cardTitle.innerHTML = title
    cardText.innerHTML = text;
    cardFooter.innerHTML = date;

    cardBody.appendChild(cardText);

    card.appendChild(cardTitle);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    document.getElementById('info').appendChild(card);
}

function createCardsElektrik(title, text, date) {
  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h5');
  const cardText = document.createElement('p');
  const cardFooter = document.createElement('div');
  card.classList.add('card');
  cardBody.classList.add('card-body');
  cardTitle.classList.add('card-header');
  cardText.classList.add('card-text');
  cardFooter.classList.add('card-footer', 'text-muted');
  cardTitle.innerHTML = title
  cardText.innerHTML = text;
  cardFooter.innerHTML = date;

  cardBody.appendChild(cardText);

  card.appendChild(cardTitle);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  document.getElementById('info2').appendChild(card);
}

function hourDiff(start_date, end_date) {
  const date1String = start_date;
  const date2String = end_date;

  const date1 = new Date(date1String);
  const date2 = new Date(date2String);

  const timeDifferenceMs = date2 - date1;

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));

  // Format the time difference
  const timeDifferenceFormatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return timeDifferenceFormatted;
}

function calcDate(start_date, end_date) {
  const date1String = start_date;
  const date2String = end_date;
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);
  const date1Formatted = date1.toISOString().split('T')[0];
  const time1Formatted = date1.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const time2Formatted = date2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const diff = hourDiff(start_date, end_date);
  return `${date1Formatted} saat ${time1Formatted} ile ${time2Formatted} arasında yaklaşık ${diff} saat elektrik kesintisi olacaktır.`;
}

async function loadPage(map) {
    try {
      let x = 0;
      let y = 0;
      const duyurular = await fetchDuyurular('duyurular');
      duyurular.forEach(element => {
        x++
        createCards(element.title, element.desc, element.pubDate);
        document.getElementById('duyCount').innerHTML = x;
      });

      const elektrik = await fetchDuyurular('elektrik_duyurular');
      elektrik.forEach(element => {
        y++;
        var title, desc;
        if (element.ilce === 'None') {
          title = 'Planlanan bir kesinti yoktur';
          desc = element.kesintiNedeni;
        }
        else {
          const mahalle = (element.mahalle + ' Mahallesi').toLowerCase().replace(/(^|\s)\S/g, function (c) {
            return c.toUpperCase();
          });
          const ilce = element.ilce.toLowerCase().replace(/(^|\s)\S/g, function (c) {
            return c.toUpperCase();
          });
          if (element.sokak === null) {
            title = ilce + ' / ' + mahalle;
            desc = calcDate(element.startDate, element.endDate);
          }
          else {
            if (element.sokak.includes('İSİMSİZ')) {
              title = ilce + ' / ' + mahalle;
              desc = calcDate(element.startDate, element.endDate);
            }
            else {
              title = ilce + ' / ' + mahalle + ' / ' + element.sokak.toLowerCase().replace(/(^|\s)\S/g, function(c) {
                return c.toUpperCase();
              });
              desc = calcDate(element.startDate, element.endDate);
            }
            
          }
        }
        createCardsElektrik(title, desc, element.startDate);
        document.getElementById('elCount').innerHTML = y;
      });
  
    } catch (error) {
      console.error('Error adding entries:', error);
    }
  }
  $(document).ready(function () {
    $(".infos").click(function() {
      var target = $(this).data("target");
      $(".info-section").removeClass("active");
      $("#" + target).addClass("active");
    });
    loadPage();
});