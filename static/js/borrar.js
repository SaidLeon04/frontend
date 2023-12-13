function borrar(email){
    confirmacion = confirm("¿Estás seguro de que quieres borrar el usuario " + email + "?");
    if (confirmacion) {

        const token = sessionStorage.getItem('token');
        console.log(email)
        console.log(token)
        var requestToken = new XMLHttpRequest();
        requestToken.open('GET', 'http://localhost:8000/contactos/' + email);
        requestToken.setRequestHeader('Authorization', 'Bearer ' + token);
        requestToken.send();

        requestToken.onload = () => {
            if (requestToken.status === 200) {
                console.log('token válido')
                var request = new XMLHttpRequest();
                request.open('DELETE', "http://localhost:8000/contactos/" + email);
                request.setRequestHeader('Authorization', 'Bearer ' + token);
                request.send();
                alert('Contacto borrado correctamente')
                window.location.href = 'http://localhost:8080/templates/todos.html?token=' + token;
            }else{
                alert('Token inválido, inicia sesión de nuevo')
                window.location.href = 'http://localhost:8080/login';
            }
        }
    }
}