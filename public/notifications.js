const getNotificaciones = async () => {
  let notificaciones = await fetch ("/cazador/notificaciones")
  let datos = await notificaciones.json()
  return datos
}

const sendNotificacion = (e) => {
  // e.preventDefault();
}

const mostrarNotificaciones = (datos) => {
  datos.forEach(notificacion => {
    $('.notifi-box').append(
      `<div class="notifi-item" onclick="togglePopUp('${notificacion.id}')">
        <img src="Img/perfil2.jpg" alt="img">
        <div class="text">
          <h4>${notificacion.nombreProveedor}</h4>
          <p>${notificacion.idProveedor}</p>
        </div>
      </div>`
    )

    $('.popups').append(
      `<section class="form-bg" id="${notificacion.id}">
        <div class="form">

            <h2 class="create">¡Nueva postulación!</h2>
            <div class="center-p">
                <p><a href="">${notificacion.nombreProveedor}</a> se ha postulado al <a href="">${notificacion.nombreProyecto}</a>. Si le interesa su perfil, ¡proponga una cita!</p>
            </div>
            <form class="form-content-date" onsubmit="return false">

                <div class="date-container">
                    <div class="date">
                        <label for="fecha-cita">Fecha de la Cita</label>
                        <input type="date" name="fecha" id="fecha-cita" required>
                    </div>
                    <div class="time">
                        <label for="hora-cita">Hora de la Cita</label>
                        <input type="time" name="hora" id="hora-cita" required>
                    </div>
                </div>

                <div class="confirmation-container">
                    <button type="submit" class="button negation">
                        Negar postulación </button>
                    <button type="submit" class="button form-sign-up" onclick="sendNotificacion();togglePopUp('${notificacion.id}')">
                        Proponer cita </button>
                </div>
                <div class="close-form" onclick="togglePopUp('${notificacion.id}')">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <polygon fill="inherit"
                            points="11.649 9.882 18.262 3.267 16.495 1.5 9.881 8.114 3.267 1.5 1.5 3.267 8.114 9.883 1.5 16.497 3.267 18.264 9.881 11.65 16.495 18.264 18.262 16.497">
                        </polygon>
                    </svg>
                </div>
            </form>
        </div>
      </section>`
    )
  })
}

getNotificaciones().then(datos => mostrarNotificaciones(datos));