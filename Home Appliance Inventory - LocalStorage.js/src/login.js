// Adiciona um evento de envio ao formulário de login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    
    // Obtém o valor do campo de entrada do nome de usuário
    const username = document.getElementById('username').value;
    
    // Verifica se o nome de usuário é "Francisco" ou "francisco"
    if (username === "Francisco" || username === "francisco") {
        // Define o cookie com o nome do usuário e validade de 8 horas
        setCookie("username", username, 8);
        // Redireciona para a página principal
        window.location.href = "index.html";
    } else {
        alert("Login falhou. Verifique seu nome de usuário.");
    }
});

// Função para definir um cookie
function setCookie(name, value, hours) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
}
