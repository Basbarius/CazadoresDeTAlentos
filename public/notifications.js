const getNotificacionesCazador = async () => {
  let notificaciones = await fetch ("/cazador/notificaciones")
  let datos = await notificaciones.json()
  return datos
}

const getNotificacionesTalento = async () => {
  let notificaciones = await fetch ("/talento/notificaciones")
  let datos = await notificaciones.json()
  return datos
}

const sendNotificacionCazador = async (event) => {
  let notificacion = event.data
  body = JSON.stringify({
    id: notificacion.id,
    idProveedor: notificacion.idProveedor,
    idProyecto: notificacion.idProyecto,
    nombreProyecto: notificacion.nombreProyecto,
    fecha: $(`#${notificacion.id} #fecha-cita`).val(),
    hora: $(`#${notificacion.id} #hora-cita`).val()
  })
  fetch("/talento/notificaciones", {
    method: "POST",
    body: body,
    headers:{          
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  togglePopUp(notificacion.id)
}

const mostrarNotificacionesCazador = (datos) => {
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
                    <button type="submit" class="button form-sign-up">
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
    $(`#${notificacion.id} .form-sign-up`).click(notificacion, sendNotificacionCazador);
  })
}

const mostrarNotificacionesTalento = (datos) => {
  datos.forEach(notificacion => {
    $('.notifi-box').append(
      `<div class="notifi-item" onclick="togglePopUp('${notificacion.id}')">
        <img src="Img/perfil2.jpg" alt="img">
        <div class="text">
          <h4>${notificacion.nombreCazador}</h4>
          <p>${notificacion.idCazador}</p>
        </div>
      </div>`
    )

    $('.popups').append(
      `<section class="form-bg" id="${notificacion.id}">
      <div class="form">
          <h2 class="create">¡Postulación aceptada!</h2>
          <div class="center-p">
              <p>${notificacion.nombreCazador}, el responsable de <a href="">${notificacion.nombreProyecto}</a> ha aceptado tu postulación y quiere tener una cita contigo. ¿Funciona para ti?</p>
          </div>
          <h3><b>Fecha propuesta:</b> ${notificacion.fecha} ${notificacion.hora}</h3>
          <form class="form-content-date" onsubmit="return false">
              <div class="radio radio-cita">
                  <input type="radio" name="usuario" id="cazador-form" required>
                  <label for="cazador-form" class="cazador-form" onclick="hideOptions()">¡Definitivamente!</label>

                  <input type="radio" name="usuario" id="proveedor-form" required>
                  <label for="proveedor-form" class="proveedor-form" onclick="showOptions()">Talvez no...</label>
              </div>
              <div id="propose-new">
                  <label for="nombre-sign-up" class="propose">Proponga una fecha y hora alternativa para la
                      cita</label>
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
              </div>

              <div class="confirmation-container">
                  <button type="submit" class="button negation-talento">
                      Cancelar </button>
                  <button type="submit" class="button form-sign-up">
                      Responder </button>
              </div>
              <div class="close-form" onclick="togglePopUp('${notificacion.id}'); hideOptions()">
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

if (window.location.pathname.endsWith('cazador')){
  getNotificacionesCazador().then(datos => mostrarNotificacionesCazador(datos));
} 
else if (window.location.pathname.endsWith('talento')) {

  getNotificacionesTalento().then(datos => mostrarNotificacionesTalento(datos));
}