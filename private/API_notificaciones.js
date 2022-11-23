let notificacionesCazador = [{
    idCazador: '@bas',
    notificaciones: [{
            type: 'postulacion',
            id: '123abc',
            idProyecto: 'proyecto1',
            nombreProyecto: 'Proyecto 1',
            idProveedor: '@alejandro',
            nombreProveedor: 'Alejandro Oliva',
            costoHora: '500',
            reputation: [2]
        },
        {
            type: 'postulacion',
            id: '456dfe',
            idProyecto: 'proyecto1',
            nombreProyecto: 'Proyecto 1',
            idProveedor: '@dulce',
            nombreProveedor: 'Dulce Garcia',
            costoHora: '100',
            reputation: [5]
        }
    ]
}]

let notificacionesTalento = [{
        idTalento: '@alejandro',
        notificaciones: [{
            type: 'propuesta',
            id: '789ghi',
            idCazador: '@bas',
            nombreCazador: 'Bas',
            idProyecto: 'proyecto2',
            nombreProyecto: 'Proyecto 2',
            fecha: '12-10-2022',
            hora: '13:00'
        }]
    },
    {
        idTalento: '@dulce',
        notificaciones: [

        ]
    }
]

const sendNotificacionesCazador = function(request, response) {
    let notificaciones = [];
    notificacionesCazador.forEach(cazador => {
        if (cazador.idCazador === request.params.id) {
            notificaciones = cazador.notificaciones;
        }
    })
    response.json(notificaciones)
}

const deleteNotificacionCazador = function(request, response) {
    notificacionesCazador.forEach(cazador => {
        if (cazador.idCazador === request.params.id) {
            cazador.notificaciones.forEach(notificacion => {
                if (notificacion.id === request.params.idNotificacion) {
                    cazador.notificaciones.splice(cazador.notificaciones.indexOf(notificacion), 1);
                }
            })
        }
    })
}

const deleteNotificacionTalento = function(request, response) {
    notificacionesTalento.forEach(talento => {
        if (talento.idTalento === request.params.id) {
            talento.notificaciones.forEach(notificacion => {
                if (notificacion.id === request.params.idNotificacion) {
                    talento.notificaciones.splice(talento.notificaciones.indexOf(notificacion), 1);
                }
            })
        }
    })
}

const sendNotificacionesTalento = function(request, response) {
    let notificaciones = [];
    notificacionesTalento.forEach(talento => {
        if (talento.idTalento === request.params.id) {
            notificaciones = talento.notificaciones;
        }
    })
    response.json(notificaciones)
}

const postNotificacionTalento = function(request, response) {
    console.log('notificacion proveedor', request.body)
    let notificacionNueva = request.body;
    notificacionesTalento.forEach(talento => {
        if (talento.idTalento === request.params.id) {
            if (notificacionNueva.type === 'propuesta') {
                talento.notificaciones.unshift({
                    type: notificacionNueva.type,
                    id: notificacionNueva.id,
                    idProyecto: notificacionNueva.idProyecto,
                    nombreProyecto: notificacionNueva.nombreProyecto,
                    idCazador: notificacionNueva.idCazador,
                    nombreCazador: notificacionNueva.nombreCazador,
                    fecha: notificacionNueva.fecha,
                    hora: notificacionNueva.hora
                })
            } else if (notificacionNueva.type === 'rechazo') {
                talento.notificaciones.unshift({
                    type: notificacionNueva.type,
                    id: notificacionNueva.id,
                    idCazador: notificacionNueva.idCazador,
                    nombreCazador: notificacionNueva.nombreCazador,
                    nombreProyecto: notificacionNueva.nombreProyecto
                })
            } else if (notificacionNueva.type === 'confirmacion') {
                talento.notificaciones.unshift({
                    type: notificacionNueva.type,
                    id: notificacionNueva.id,
                    idProyecto: notificacionNueva.idProyecto,
                    nombreProyecto: notificacionNueva.nombreProyecto,
                    idCazador: notificacionNueva.idCazador,
                    nombreCazador: notificacionNueva.nombreCazador,
                    idProveedor: notificacionNueva.idProveedor,
                    nombreProveedor: notificacionNueva.nombreProveedor,
                    fecha: notificacionNueva.fecha,
                    hora: notificacionNueva.hora
                })
            } else if (notificacionNueva.type === 'nueva-propuesta') {
                talento.notificaciones.unshift({
                    type: notificacionNueva.type,
                    id: notificacionNueva.id,
                    idProyecto: notificacionNueva.idProyecto,
                    nombreProyecto: notificacionNueva.nombreProyecto,
                    idCazador: notificacionNueva.idCazador,
                    nombreCazador: notificacionNueva.nombreCazador,
                    idProveedor: notificacionNueva.idProveedor,
                    nombreProveedor: notificacionNueva.nombreProveedor,
                    fecha: notificacionNueva.fecha,
                    hora: notificacionNueva.hora
                })
            } else {
              talento.notificaciones.unshift({
                type: notificacionNueva.type,
                id: notificacionNueva.id,
                idProyecto: notificacionNueva.idProyecto,
                nombreProyecto: notificacionNueva.nombreProyecto,
                idCazador: notificacionNueva.idCazador,
                nombreCazador: notificacionNueva.nombreCazador,
                idProveedor: notificacionNueva.idProveedor,
                nombreProveedor: notificacionNueva.nombreProveedor
            })
            }
        }
    })
}

const postNotificacionCazador = function(request, response) {
  console.log('notificacion cazador', request.body)
    let notificacionNueva = request.body;
    notificacionesCazador.forEach(cazador => {
        if (cazador.idCazador === request.params.id) {
            if (notificacionNueva.type === 'postulacion') {
                cazador.notificaciones.unshift({
                    type: notificacionNueva.type,
                    id: notificacionNueva.id,
                    idProyecto: notificacionNueva.idProyecto,
                    nombreProyecto: notificacionNueva.nombreProyecto,
                    idProveedor: notificacionNueva.idProveedor,
                    nombreProveedor: notificacionNueva.nombreProveedor,
                    reputation: notificacionNueva.reputation
                })
            } else if (notificacionNueva.type === 'confirmacion') {
                cazador.notificaciones.unshift({
                    type: notificacionNueva.type,
                    id: notificacionNueva.id,
                    idProyecto: notificacionNueva.idProyecto,
                    nombreProyecto: notificacionNueva.nombreProyecto,
                    idProveedor: notificacionNueva.idProveedor,
                    nombreProveedor: notificacionNueva.nombreProveedor,
                    idCazador: notificacionNueva.idCazador,
                    nombreCazador: notificacionNueva.nombreCazador,
                    fecha: notificacionNueva.fecha,
                    hora: notificacionNueva.hora
                })
            } else if (notificacionNueva.type === 'nueva-propuesta') {
                cazador.notificaciones.unshift({
                    type: notificacionNueva.type,
                    id: notificacionNueva.id,
                    idProyecto: notificacionNueva.idProyecto,
                    nombreProyecto: notificacionNueva.nombreProyecto,
                    idProveedor: notificacionNueva.idProveedor,
                    nombreProveedor: notificacionNueva.nombreProveedor,
                    idCazador: notificacionNueva.idCazador,
                    nombreCazador: notificacionNueva.nombreCazador,
                    fecha: notificacionNueva.fecha,
                    hora: notificacionNueva.hora
                })
            } else {
              cazador.notificaciones.unshift({
                type: notificacionNueva.type,
                id: notificacionNueva.id,
                idProyecto: notificacionNueva.idProyecto,
                nombreProyecto: notificacionNueva.nombreProyecto,
                idProveedor: notificacionNueva.idProveedor,
                nombreProveedor: notificacionNueva.nombreProveedor,
                idCazador: notificacionNueva.idCazador,
                nombreCazador: notificacionNueva.nombreCazador
            })
            }
        }
    })
}

module.exports = {
    sendNotificacionesCazador,
    deleteNotificacionCazador,
    postNotificacionCazador,
    sendNotificacionesTalento,
    deleteNotificacionTalento,
    postNotificacionTalento
};