google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(getGraf);

var resultado = document.getElementById('resposta');

function animarSuc() { 
    resultado.style.transition = '1s';
    resultado.style.background = 'rgb(52, 255, 29, 0.7)';
    window.scrollTo(0, 0);
    animar();
}

function animarErr() { 
    resultado.style.transition = '1s';
    resultado.style.background = 'rgb(250, 11, 11, 0.7)';
    window.scrollTo(0, 0);
    animar();
}

function animar() { 
    setTimeout(function() {
        resultado.style.transition = '1s';
        resultado.style.background = 'rgba(0, 0, 0, 0.2)'; 
    }, 2000);
}

function getGraf() {
    fetch('/backend/Router/grafico.php', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                resultado.innerHTML = '<p>Não autorizado</p>';
                animarErr();
            } else {
                resultado.innerHTML = '<p>Sem rede ou não conseguiu localizar o recurso</p>';
                animarErr();
            }
        }
        return response.json();
    })
    .then(data => {
        //graf(data);
        drawChart(data);
    })
    .catch(error => animarErr(), resultado.innerHTML = '<p>Erro na requisição</p>');
}


function drawChart(data0) {
    const graf = data0.grafico;
    const array0 = [['Usuários', 'Quantidade de produtos']];

    for (let i = 0; i < graf.length; i++) {
        array0.push([graf[i]['usuario'], graf[i]['quant_prod']])
    }
    
    
    var data = google.visualization.arrayToDataTable(array0);


  var options = {
    title: 'Gráfico de usuários e produtos',
    subtitle: 'Fatec Itaquera - 2023',
    hAxis: { minValue: 0 },
    bars: 'vertical',
    width: 1000,
    height: 600,
    series: {
        0: { color: 'orange' }, 
    }
  };

  var chart = new google.charts.Bar(document.getElementById('barchart_material'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}