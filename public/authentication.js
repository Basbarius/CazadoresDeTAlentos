function contains(arr, key, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] === val) return true;
    }
    return false;
}

const authenticate = async(correo, contraseña) => {
    let credenciales = await fetch("/login/authentication")
    let datos = await credenciales.json()
    path = window.location.href

    // Revisar si existe el correo y la contraseña
    if (contains(datos, "correo", correo) && contains(datos, "contraseña", contraseña)) {
        var result = datos.filter(x => x.correo === correo);
        // Redirect to page
        if (result[0].userType === "cazador") {
            location.replace(path + `cazador/${result[0].userID}`)
        } else {
            location.replace(path + `talento/${result[0].userID}`)
        }
    } else if ((contains(datos, "correo", correo)) === true && (contains(datos, "contraseña", contraseña)) === false) {
        alert('Contraseña incorrecta');
    } else {
        alert('Usuario no existente');
    }
}