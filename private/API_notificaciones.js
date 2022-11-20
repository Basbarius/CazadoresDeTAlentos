let notificacionesCazador = [
  {
      idCazador: '@bas',
      notificaciones: [
          {
              id: '123abc',
              idProveedor: '@alejandro',
              nombreProveedor: 'Alejandro Oliva',
              idProyecto: 'proyecto1',
              nombreProyecto: 'Proyecto 1'
          },
          {
              id: '456dfe',
              idProveedor: '@dulce',
              nombreProveedor: 'Dulce Garcia',
              idProyecto: 'proyecto1',
              nombreProyecto: 'Proyecto 1'
          }
      ]
  }
]

let notificacionesTalento = [
  {
      idTalento: '@alejandro',
      notificaciones: [
          {
              id: '789ghi',
              idCazador: '@bas',
              nombreCazador: 'Bas',
              idProyecto: 'proyecto2',
              nombreProyecto: 'Proyecto 2',
              fecha: '12-10-2022',
              hora: '13:00'
          }
      ]
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
    if (cazador.idCazador === request.params.id){
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
          console.log('deleted')
        }
      })
    }
  })
}

const sendNotificacionesTalento = function(request, response) {
  let notificaciones = [];
  notificacionesTalento.forEach(talento => {
    if (talento.idTalento === request.params.id){
      notificaciones = talento.notificaciones;
    }
  })
  response.json(notificaciones)
}

const postNotificacionTalento = function(request, response) {
  console.log(request.body)
  let notificacionNueva = request.body;
  notificacionesTalento.forEach(talento => {
    if (talento.idTalento === request.params.id) {
      talento.notificaciones.unshift({
        id: notificacionNueva.id,
        idProyecto: notificacionNueva.idProyecto,
        nombreProyecto: notificacionNueva.nombreProyecto,
        idCazador: notificacionNueva.idCazador,
        nombreCazador: notificacionNueva.nombreCazador,
        fecha: notificacionNueva.fecha,
        hora: notificacionNueva.hora
      })
    }
  })
}

module.exports = { sendNotificacionesCazador, deleteNotificacionCazador, sendNotificacionesTalento, postNotificacionTalento };