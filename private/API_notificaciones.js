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
      idTalento: '@Alejandro',
      notificaciones: [
          {
              id: '123abc',
          }
      ]
  },
  {
    idTalento: '@Dulce',
    notificaciones: [
        {
            id: '123abc',
        }
    ]
}
]

const sendNotificacionesCazador = function(request, response){
  response.json(notificacionesCazador[0].notificaciones)
}

const sendNotificacionesTalento = function(request, response){
  response.json(notificacionesCazador[0].notificaciones)
}

module.exports = { sendNotificacionesCazador, sendNotificacionesTalento };