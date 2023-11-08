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
    const nomeUsuario = document.getElementById('nome').value;
    const emailUsuario = document.getElementById('email').value;
    const senhaUsuario = document.getElementById('senha').value;

    if (!nomeUsuario || !emailUsuario || !senhaUsuario) {
        resultado.innerHTML = 'Por favor, preencha todos os campos!';
        animarErr();
        return;
    }

    const usuario = {
        nome_u: nomeUsuario,
        email: emailUsuario,
        senha: senhaUsuario,
    };

    fetch('/backend/Router/usuarios.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
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
            resultado.innerHTML = '<p>Usuário já existe</p>';
            animarErr();
        }else{
            resultado.innerHTML = '<p>Usuário criado</p>';
            animarSuc();
            document.getElementById('nome').value = "";
            document.getElementById('email').value = "";
            document.getElementById('senha').value = "";
        } 
    })
    .catch(error => animarErr(), resultado.innerHTML = '<p>Erro na requisição</p>');
}
