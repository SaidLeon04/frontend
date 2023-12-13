function get_one(email) {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    sessionStorage.setItem('token', token);
    const URL = "http://localhost:8000/contactos";
    //const URL = "https://heroku-python-3act-62ad9044fdb9.herokuapp.com/contactos"
    
    if(token){
        fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al realizar la solicitud.');
        }
        return response.json();
    })
    .then(data => {
        const emailMatch = data.find(item => item.email === email);
        if (emailMatch) {
            email = emailMatch["email"];
            nombre = emailMatch["nombre"];
            telefono = emailMatch["telefono"];
            const tbody_contactos = document.getElementById("tbody_contactos");
            var tr = document.createElement("tr");
            var td_email = document.createElement("td");
            var td_nombre = document.createElement("td");
            var td_telefono = document.createElement("td");

            td_email.innerHTML = email;
            td_nombre.innerHTML = nombre;
            td_telefono.innerHTML = telefono;

            tr.appendChild(td_email);
            tr.appendChild(td_nombre);
            tr.appendChild(td_telefono);

            tbody_contactos.appendChild(tr);
        
        } else {
            alert("No se encontro el contacto");
        } 

    })
    .catch(error => {
        alert("No autorizado");
        sessionStorage.clear();
        window.location.href = "http://localhost:8080/templates/index.html";
    });
    }else{
        console.log("No se encontro un token");
    }
};
