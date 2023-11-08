document.getElementById('submitButton').addEventListener('click', createUser);
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

function createUser() {
    const idUsuario = document.getElementById('idUsuario').value;
    const cepUsuario = document.getElementById('cep').value;
    const ruaUsuario = document.getElementById('rua').value;
    const bairroUsuario = document.getElementById('bairro').value;
    const cidadeUsuario = document.getElementById('cidade').value;
    const ufUsuario = document.getElementById('uf').value;

    if (!idUsuario || !cepUsuario || !ruaUsuario || !bairroUsuario || !cidadeUsuario || !ufUsuario) {
        resultado.innerHTML = 'Por favor, preencha todos os campos!';
        animarErr();
        return;
    }

    const endereco = {
        cep: cepUsuario, 
        rua: ruaUsuario,
        bairro: bairroUsuario, 
        cidade: cidadeUsuario,
        uf: ufUsuario,
        iduser: idUsuario
    };

    fetch('/backend/Router/endereco.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(endereco)
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
        if(!data.status){
            resultado.innerHTML = '<p>Endereco já existe</p>';
            animarErr();
        }else{
            resultado.innerHTML = '<p>Endereco criado</p>';
            animarSuc();
            document.getElementById('idUsuario').value = "";
            document.getElementById('cep').value = "";
            document.getElementById('rua').value = "";
            document.getElementById('bairro').value = "";
            document.getElementById('cidade').value = "";
            document.getElementById('uf').value = "";
        } 
    })
    .catch(error => animarErr(), resultado.innerHTML = '<p>Este ID não pertence a nenhum usuário</p>');
}
