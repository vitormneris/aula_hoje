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

function updateUser() {
    const userId = document.getElementById("getUserId").value;
    const userName = document.getElementById("inpuNome").value;
    const userEmail = document.getElementById("inpuEmail").value;
    const userSenha = document.getElementById("inpuSenha").value;


    const usuarioAtualizado = {
        nome_u: userName,
        email: userEmail,
        senha: userSenha
    };



    fetch('/backend/Router/usuarios.php?id=' + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioAtualizado)
    })
        .then(response => {
            if (!response.ok) {
                if (response.status0 === 401 || response.status1 === 401) {
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
                resultado.innerHTML = '<p>Usuário atualizado</p>';
                animarSuc();
            }
        })
        .catch(error => animarErr(), resultado.innerHTML = '<p>Erro na requisição</p>');

}
