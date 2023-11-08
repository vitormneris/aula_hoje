document.getElementById('getAllButton').addEventListener('click', getAllEnd);
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

function getAllEnd() {
    fetch('/backend/Router/endereco.php', {
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
        displayEnd(data);
    })
    .catch(error => animarErr(), resultado.innerHTML = '<p>Erro na requisição</p>');
}

function displayEnd(data) {
    const endereco = data.enderecos;

    const endDiv = document.getElementById('endList');
    endDiv.innerHTML = '';

    const list = document.createElement('ul');

    for (let i = 0; i < endereco.length ; i = i + 1) {
        const pula = document.createElement('br');

        const listItemEnd = document.createElement('li');
        listItemEnd.textContent = `ID: ${endereco[i]['id']}`;
        list.appendChild(listItemEnd);
        const listItemEnd0 = document.createElement('li');
        listItemEnd0.textContent = `CEP: ${endereco[i]['cep']}`;
        list.appendChild(listItemEnd0);
        const listItemEnd1 = document.createElement('li');
        listItemEnd1.textContent = `Rua: ${endereco[i]['rua']}`;
        list.appendChild(listItemEnd1);
        const listItemEnd2 = document.createElement('li');
        listItemEnd2.textContent = `Bairro: ${endereco[i]['bairro']}`;
        list.appendChild(listItemEnd2);
        const listItemEnd3 = document.createElement('li');
        listItemEnd3.textContent = `Cidade: ${endereco[i]['cidade']}`;
        list.appendChild(listItemEnd3);
        const listItemEnd4 = document.createElement('li');
        listItemEnd4.textContent = `UF: ${endereco[i]['uf']}`;
        list.appendChild(listItemEnd4);
        const listItemEnd5 = document.createElement('li');
        listItemEnd5.textContent = `ID do usuário: ${endereco[i]['iduser']}`;
        list.appendChild(listItemEnd5);
        
        list.appendChild(pula);
    }
    endDiv.appendChild(list);
    resultado.innerHTML = '<p>Endereços listados</p>';
    animarSuc();
}
