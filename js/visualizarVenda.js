document.getElementById('getAllButton').addEventListener('click', getAllVenda);
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

function getAllVenda() {
    fetch('/backend/Router/venda.php', {
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
        displayUsers(data);
    })
    .catch(error => animarErr(), resultado.innerHTML = '<p>Erro na requisição</p>');
}

function displayUsers(data) {
    const vendas = data.vendas;

    const vendaDiv = document.getElementById('vendaList');
    vendaDiv.innerHTML = ''; 

    const list = document.createElement('ul');

    vendas.forEach(venda => {
        const listItem = document.createElement('li');
        const pula = document.createElement('br');

        listItem.textContent = `ID: ${venda.id} ID_usuário: ${venda.id_usuario} ID_produto: ${venda.id_produto} Criado: ${venda.criado}`;
        list.appendChild(listItem);

        list.appendChild(pula);
    });
    vendaDiv.appendChild(list);
    resultado.innerHTML = '<p>Vendas listadas</p>';
    animarSuc();
}
