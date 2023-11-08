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
    setTimeout(function () {
        resultado.style.transition = '1s';
        resultado.style.background = 'rgba(0, 0, 0, 0.2)';
    }, 2000);
}

function updateEnd() {
    const endId = document.getElementById("getEndId").value;
    const cepUsuario = document.getElementById('cep').value;
    const ruaUsuario = document.getElementById('rua').value;
    const bairroUsuario = document.getElementById('bairro').value;
    const cidadeUsuario = document.getElementById('cidade').value;
    const ufUsuario = document.getElementById('uf').value;

    const enderecoAtualizado = {
        cep: cepUsuario,
        rua: ruaUsuario,
        bairro: bairroUsuario,
        cidade: cidadeUsuario,
        uf: ufUsuario,
    };

    fetch('/backend/Router/endereco.php?id=' + endId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enderecoAtualizado)
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
            if (!data.status) {
                resultado.innerHTML = '<p>Não pode atualizar</p>';
                animarErr();
            } else {
                resultado.innerHTML = '<p>Endereço atualizado</p>';
                animarSuc();
            }
        })
        .catch(error => animarErr(), resultado.innerHTML = '<p>Erro na requisição</p>');

}
