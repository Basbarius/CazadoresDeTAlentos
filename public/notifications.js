console.log('hi')
const getNotificaciones = async () => {
  let notificaciones = await fetch ("/cazador/notificaciones")
  let datos = await notificaciones.json()
  console.log(datos)
}

getNotificaciones()