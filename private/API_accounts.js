var cuentasExistentes = [{
        nombre: 'David Sebastiaan',
        userID: '@bas',
        userType: 'Cazador',
        correo: 'david@hotmail.com',
        contraseña: '1234',
        capacidades: 'Diseñador',
        costoH: '10',
        estado: 'Jalisco',
        reputacion: [
            {
                reputation: 5,
                fecha: '2022-11-03'
            },
            {
                reputation: 4,
                fecha: '2022-11-04'
            }
        ]
    },
    {
        nombre: 'Dulce Maria',
        userID: '@dulce',
        userType: 'Talento',
        correo: 'dulce@hotmail.com',
        contraseña: '5678',
        capacidades: 'Creadora de videojuegos',
        costoH: '100',
        estado: 'Baja california',
        reputacion: [
            {
                reputation: 5,
                fecha: '2022-11-03'
            }
        ]
    },
    {
        nombre: 'Alejandro Olvida',
        userID: '@alejandro',
        userType: 'Talento',
        correo: 'alejandro@hotmail.com',
        contraseña: '5678',
        capacidades: 'Creadora de videojuegos',
        costoH: '100',
        estado: 'Baja california',
        reputacion: [
            {
                reputation: 2,
                fecha: '2022-11-03'
            },
            {
                reputation: 3,
                fecha: '2022-11-13'
            }
        ]
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

const avgReputation = function(request, response) {
    let usuarios = [];
    let resultAvg = [];
    let sum = 0;
    cuentasExistentes.forEach(user => {
        if (user.userID === request.params.id) {
            usuarios = user.reputacion;
            usuarios.forEach(usuario => {
                sum += usuario.reputation
            })
            resultAvg = sum / usuarios.length
        }
    })
    response.json(resultAvg)
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
        contraseña: usuarioNuevo.contraseña,
        capacidades: usuarioNuevo.capacidades,
        costoH: usuarioNuevo.costoH,
        costoP: usuarioNuevo.costoP,
        estado: usuarioNuevo.estado,
        reputacion: []
    })
}

const postReview = function(request, response) {
    let score = parseInt(request.body.score)
    cuentasExistentes.forEach(cuenta => {
        if (cuenta.userID === request.params.id) {
            let currentDate = new Date().toJSON().slice(0, 10);
            cuenta.reputacion.push({
                reputation: score,
                fecha: currentDate
            })
        }
    })
}

module.exports = {
    getCredenciales,
    getNameFromID,
    updateCredentials,
    getUserInfo,
    avgReputation,
    postReview
}