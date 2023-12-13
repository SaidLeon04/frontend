function ver(email){
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    sessionStorage.setItem('token', token);

    var email = urlParams.get('email');
    const url = "http://localhost:8000/contactos";
    //const URL = "https://heroku-python-3act-62ad9044fdb9.herokuapp.com/contactos"
    if (token){
        fetch(url, {
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
        const emailFromURL = urlParams.get('email');
        const emailMatch = data.find(item => item.email === emailFromURL);

        if (emailMatch) {
            email = emailMatch["email"];
            nombre = emailMatch["nombre"];
            telefono = emailMatch["telefono"];
            var labelEmail = document.createElement("label");
            var labelNombre = document.createElement("label");
            var labelTelefono = document.createElement("label");
            var saltos = document.createElement("br");
    
            labelEmail.setAttribute("for", "email");
            labelEmail.textContent = "Correo: " + email;
            labelNombre.setAttribute("for", "nombre");
            labelNombre.textContent = "Nombre: " + nombre;
            labelTelefono.setAttribute("for", "telefono");
            labelTelefono.textContent = "Telefono: " + telefono;
          
            document.body.appendChild(labelEmail);
            document.body.appendChild(saltos);
            document.body.appendChild(labelNombre);
            document.body.appendChild(saltos);
            document.body.appendChild(labelTelefono);
        } else {
            console.log('No se encontró ningún correo electrónico que coincida con el proporcionado en la URL.');
        }       
      })
      .catch(error => {
        alert("No autorizado");
        //window.location.href = "http://localhost:8080/templates/index.html";
      });
    } else {
      console.log('No se encontró un token.');
    }
}