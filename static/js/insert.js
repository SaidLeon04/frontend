function insert(email, nombre, telefono) {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    sessionStorage.setItem('token', token);

    const URL = "http://localhost:8000/contactos";
    const datos = {
        email: email,
        nombre: nombre,
        telefono: telefono
    };

    if (token) {
        fetch(`${URL}?email=${email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al realizar la verificación del email.');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0 && data.some(item => item.email === email)) {
                alert("El email ya está registrado");
            } else {
                fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al realizar la solicitud de inserción.');
                    }
                    return response.json();
                })
                .then(data => {
                    window.location.href = "http://localhost:8080/templates/todos.html?token=" + token;
                })
                .catch(error => {
                    alert("Error al insertar los datos");
                    window.location.href = "http://localhost:8080/templates/index.html";
                });
            }
        })
        .catch(error => {
            alert("Error al verificar el email");
            window.location.href = "http://localhost:8080/templates/index.html";
        });
    } else {
        console.log('No se encontró un token.');
    }
}
