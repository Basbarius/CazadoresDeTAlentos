var cuentasExistentes = [{
        nombre: 'David Sebastiaan',
        userID: '@bas',
        userType: 'Cazador',
        correo: 'david@hotmail.com',
        contraseña: '1234'
    },
    {
        nombre: 'Dulce Maria',
        userID: '@dulce',
        userType: 'Talento',
        correo: 'dulce@hotmail.com',
        contraseña: '5678'
    },
    {
        nombre: 'Alejandro',
        userID: '@alejandro',
        userType: 'Talento',
        correo: 'alejandro@hotmail.com',
        contraseña: '5678'
    }
]

const getCredenciales = function(request, response) {
    response.json(cuentasExistentes)
}

const getNameFromID = function(request, response) {
    let usuarios = [];
    cuentasExistentes.forEach(user => {
        if (user.userID === request.params.id) {
            usuarios = user.nombre;
        }
    })
    response.json(usuarios)
}

const getUserInfo = function(request, response) {
    var result = cuentasExistentes.filter(x => x.userID === request.params.id);
    response.json(result)
}

const updateCredentials = function(request, response) {
    let usuarioNuevo = request.body;
    cuentasExistentes.push({
        nombre: usuarioNuevo.nombre,
        userID: usuarioNuevo.userID,
        userType: usuarioNuevo.userType,
        correo: usuarioNuevo.correo,
        contraseña: usuarioNuevo.contraseña
    })
}

module.exports = {
    getCredenciales,
    getNameFromID,
    updateCredentials,
    getUserInfo
}