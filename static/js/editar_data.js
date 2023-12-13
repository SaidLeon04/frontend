function editar_data(email){
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

            var inputEmail = document.createElement("input");
            var inputNombre = document.createElement("input");
            var inputTelefono = document.createElement("input");

            inputEmail.setAttribute("type", "email");
            inputEmail.setAttribute("id", "email");
            inputEmail.setAttribute("readonly", true)
            inputEmail.setAttribute("value", email)

            inputNombre.setAttribute("type", "text");
            inputNombre.setAttribute("id", "nombre");
            inputNombre.setAttribute("value", nombre)

            inputTelefono.setAttribute("type", "number");
            inputTelefono.setAttribute("id", "telefono");
            inputTelefono.setAttribute("value", telefono)
        
            document.body.appendChild(inputEmail);
            document.body.appendChild(inputNombre);
            document.body.appendChild(inputTelefono);
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