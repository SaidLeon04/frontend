function editar(email, nombre, telefono) {
    const token = urlParams.get('token');
    sessionStorage.setItem('token', token);
    if (confirm("Actualizar contacto?")) {
        var request = new XMLHttpRequest();
        request.open('PUT', "http://localhost:8000/contactos/" + email);
        request.setRequestHeader('Authorization', 'Bearer ' + token);
        request.setRequestHeader("Content-Type", "application/json");

        var updatedData = {
            email: email,
            nombre: nombre,
            telefono: telefono
        };

        request.send(JSON.stringify(updatedData));

        request.onload = (e) => {
            alert("Contacto actualizado exitosamente");
            window.location.href = 'http://localhost:8080/templates/todos.html?token=' + token;
        };
    }
}