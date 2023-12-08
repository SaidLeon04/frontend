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
        // Manejar la respuesta, por ejemplo, guardar el token en una variable de sesión
        sessionStorage.setItem('token', data.token);
        // Redirigir a otra página o realizar acciones necesarias después de iniciar sesión
        console.log('Inicio de sesión exitoso. Token:', data.token);
        window.location.href = "https://frontentapi-de4686146bd2.herokuapp.com";
    })
    .catch(error => {
        alert(error.message);
    });
}