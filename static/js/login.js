function login(username, passwd){
    endpoint = "http://localhost:8000/token"
    const token = `${username}:${passwd}`;
    const tokenBase64 = btoa(token);
    fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${tokenBase64}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    })
    .then(data => {
        sessionStorage.setItem('token', data.token);
        console.log('Inicio de sesión exitoso. Token:', data.token);
        window.location.href = "http://localhost:8080/templates/todos.html?token="+data.token;
        //window.location.href = "http://localhost:8080/templates/todos.html"
        //window.location.href = "https://frontentapi-de4686146bd2.herokuapp.com/?token="+data.token;
    })
    .catch(error => {
        alert(error.message);
    });
}