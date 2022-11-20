let notificacionesCazador = [
  {
      idCazador: '@Bas',
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
  response.json(notificacionesCazador[0].notificaciones)
}

const sendNotificacionesTalento = function(request, response) {
  response.json(notificacionesCazador[0].notificaciones)
}

const postNotificacionTalento = function(request, response) {
  console.log(request.body)
  let notificacionNueva = request.body;
  notificacionesTalento.forEach(talento => {
    if (talento.idTalento === notificacionNueva.idProveedor) {
      talento.notificaciones.push({
        id: notificacionNueva.id,
        idProyecto: notificacionNueva.idProyecto,
        nombreProyecto: notificacionNueva.nombreProyecto,
        fecha: notificacionNueva.fecha,
        hora: notificacionNueva.hora
      })
    }
  })
}

module.exports = { sendNotificacionesCazador, sendNotificacionesTalento, postNotificacionTalento };