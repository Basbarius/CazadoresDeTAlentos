// import updateCredentials from "./private/API_notificaciones"

function contains(arr, key, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] === val) return true;
    }
    return false;
}

function isFloat(value) {
    if (typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value)) {
        return true;
    }
    return false;
}

const checkIfCorrect = async(nombre, correo, contraseña, confirmationC) => {
    let credenciales = await fetch("/login/authentication")
    let datos = await credenciales.json()
    path = window.location.href

    const result = nombre.trim().split(/\s+/);
    userID = "@" + result[0].toLowerCase()
        // Revisar si existe el correo y la contraseña
    if (contains(datos, "correo", correo)) {
        alert("El correo ingresado ya existe");
    } else if (contraseña.length < 6) {
        alert("La contraseña debe contener al menos 6 caracteres")
    } else if (contraseña !== confirmationC) {
        alert("La confirmación de la contraseña y la contraseña deben coincidir");
    } else {
        togglePopUp('form-bg-sign-up');
        togglePopUp('form-bg-sign-up2');
    }
}

const createAccount = async(nombre, tipo, correo, contraseña, capacidades, costoH, estado) => {
    let credenciales = await fetch("/login/authentication");
    let datos = await credenciales.json();
    path = window.location.href;

    const result = nombre.trim().split(/\s+/);
    userID = "@" + result[0].toLowerCase();
    // Revisar si existe el correo y la contraseña
    if (isFloat(parseFloat(costoH)) == false && Number.isInteger(parseInt(costoH)) == false) {
        alert("Costo por hora debe ser un número")
    } else {
        if (tipo === "cazador") {
            postNewAccount(nombre, userID, "cazador", correo, contraseña, capacidades, costoH, estado);
        } else {
            postNewAccount(nombre, userID, "talento", correo, contraseña, capacidades, costoH, estado);
        }
        alert("Cuenta creada correctamente");
        togglePopUp('form-bg-sign-up2');
        togglePopUp('form-bg-log-in');
    }
}

const postNewAccount = async(nombre, id, tipo, correo, contraseña, capacidades, costoH, estado) => {
    fetch(`/login/${id}/new-account`, {
        method: "POST",
        body: JSON.stringify({
            nombre: nombre,
            userID: id,
            userType: tipo,
            correo: correo,
            contraseña: contraseña,
            capacidades: capacidades,
            costoH: costoH,
            estado: estado,
            reputacion: []
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}