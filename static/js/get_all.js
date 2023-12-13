function getAll(){
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    sessionStorage.setItem('token', token);
    
    const url = 'http://localhost:8000/contactos';
    // const URL = "https://heroku-python-3act-62ad9044fdb9.herokuapp.com/contactos"

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
        const tbody_contactos = document.getElementById("tbody_contactos");
        for (var i = 0; i < Object.keys(data).length; i++) {
            var tr = document.createElement("tr");
            var td_email = document.createElement("td");
            var td_nombre = document.createElement("td");
            var td_telefono = document.createElement("td");
            var td_ver = document.createElement("td");
            var td_editar = document.createElement("td");
            var td_borrar = document.createElement("td");

            td_email.innerHTML = data[i]["email"];
            var emailCodificado = encodeURIComponent(data[i]["email"]);
            td_nombre.innerHTML = data[i]["nombre"];
            td_telefono.innerHTML = data[i]["telefono"];
            td_ver.innerHTML = '<a href="../templates/ver.html?email=' + emailCodificado + '&token=' + token + '">Ver</a>';
            td_editar.innerHTML = '<a href="../templates/editar.html?email='+ emailCodificado + '&token=' + token + '">Editar</a>';
            td_borrar.innerHTML = '<a href="../templates/borrar.html?email='+ emailCodificado + '&token=' + token + '">Borrar</a>';

            tr.appendChild(td_email);
            tr.appendChild(td_nombre);
            tr.appendChild(td_telefono);
            tr.appendChild(td_ver);
            tr.appendChild(td_editar);
            tr.appendChild(td_borrar);
            tbody_contactos.appendChild(tr);
        }
      })
      .catch(error => {
        alert("No autorizado");
        window.location.href = "http://localhost:8080/templates/index.html";
      });
    } else {
      console.log('No se encontró un token.');
    }

}
