const getNotificacionesCazador = async(id) => {
    let notificaciones = await fetch(`/cazador/${id}/notificaciones`)
    let datos = await notificaciones.json()
    return datos
}

const getNotificacionesTalento = async(id) => {
    let notificaciones = await fetch(`/talento/${id}/notificaciones`)
    let datos = await notificaciones.json()
    return datos
}

const sendNotificacionPropuesta = async(event) => {
    let notificacion = event.data
    const datos = await fetch(`/${path.substring(path.lastIndexOf('/') + 1)}/account`)
    let nombreCazador = await datos.json()

    body = JSON.stringify({
        type: 'propuesta',
        id: notificacion.id,
        idProyecto: notificacion.idProyecto,
        idCazador: path.substring(path.lastIndexOf('/') + 1),
        nombreCazador: nombreCazador,
        nombreProyecto: notificacion.nombreProyecto,
        idProveedor: notificacion.idProveedor,
        nombreProveedor: notificacion.nombreProveedor,
        fecha: $(`#${notificacion.id} #fecha-cita`).val(),
        hora: $(`#${notificacion.id} #hora-cita`).val()
    })
    fetch(`/talento/${notificacion.idProveedor}/notificaciones`, {
        method: "POST",
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`, {
        method: "DELETE"
    });
    togglePopUp(notificacion.id);
    window.location.reload();
}

const sendNotificacionRechazo = async(event) => {
    let notificacion = event.data
    const datos = await fetch(`/${path.substring(path.lastIndexOf('/') + 1)}/account`)
    let nombreCazador = await datos.json()

    if (confirm('Seguro que quieres rechazar la postulacion?')) {
        body = JSON.stringify({
            type: 'rechazo',
            id: notificacion.id,
            idCazador: path.substring(path.lastIndexOf('/') + 1),
            nombreCazador: nombreCazador,
            nombreProyecto: notificacion.nombreProyecto,
        })
        fetch(`/talento/${notificacion.idProveedor}/notificaciones`, {
            method: "POST",
            body: body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`, {
            method: "DELETE"
        });
        togglePopUp(notificacion.id);
        window.location.reload();
    }
}

const handleConfirmacion = (event) => {
    let notificacion = event.data
    fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`, {
        method: "DELETE"
    });
    togglePopUp(notificacion.id);
    window.location.reload();
}

const sendNotificacionPostulacion = async(event) => {
    let notificacion = event.data
    const datos = await fetch(`/login/${path.substring(path.lastIndexOf('/') + 1)}/new-account`)
    const reputation = await fetch(`/login/${path.substring(path.lastIndexOf('/') + 1)}/reputation`)

    let usuario = await datos.json()
    let userReputation = await reputation.json()
    let id = notificacion.idProyecto + path.substring(path.lastIndexOf('/') + 1)
    console.log(usuario[0].costoH)
    id = id.replace('@', '-')
    if (userReputation === null) {
      userReputation = 1
    }

    body = JSON.stringify({
        type: 'postulacion',
        id: id,
        idProyecto: notificacion.idProyecto,
        nombreProyecto: notificacion.nombreProyecto,
        idProveedor: path.substring(path.lastIndexOf('/') + 1),
        nombreProveedor: usuario[0].nombre,
        reputation: userReputation,
        costoHora: usuario[0].costoH

    })
    console.log(body)
    fetch(`/cazador/${notificacion.idCazador}/notificaciones`, {
        method: "POST",
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    alert("Postulaci??n hecha exitosamente")
}

const toggleNuevaPropuesta = event => {
    let id = event.data.id
    if (event.data.show) {
        $(`#${id} .accept-date`).prop('checked', true);
        $(`#${id} .change-date`).prop('checked', false);
    } else {
        $(`#${id} .accept-date`).prop('checked', false);
        $(`#${id} .change-date`).prop('checked', true);
    }
}

const handleRespuestaPropuestaProveedor = (event) => {
    let notificacion = event.data
    if ($(`#${notificacion.id} .accept-date`).is(':checked')) {
        sendConfirmacionCitaProveedor(event);
    } else if ($(`#${notificacion.id} .change-date`).is(':checked')) {
        sendNuevaPropuestaProveedor(event)
    }
}

const handleRespuestaPropuestaCazador = (event) => {
    let notificacion = event.data
    if ($(`#${notificacion.id} .accept-date`).is(':checked')) {
        sendConfirmacionCitaCazador(event);
    } else if ($(`#${notificacion.id} .change-date`).is(':checked')) {
        sendNuevaPropuestaCazador(event);
    }
}

const sendConfirmacionCitaProveedor = async(event) => {
    let notificacion = event.data
    const datos = await fetch(`/${path.substring(path.lastIndexOf('/') + 1)}/account`)
    let nombreProveedor = await datos.json()
    notificacion.idProveedor = path.substring(path.lastIndexOf('/') + 1)
    notificacion.nombreProveedor = nombreProveedor

    body = JSON.stringify({
        type: 'confirmacion',
        id: notificacion.id,
        idProyecto: notificacion.idProyecto,
        nombreProyecto: notificacion.nombreProyecto,
        idCazador: notificacion.idCazador,
        nombreCazador: notificacion.nombreCazador,
        fecha: notificacion.fecha,
        hora: notificacion.hora,
        idProveedor: path.substring(path.lastIndexOf('/') + 1),
        nombreProveedor: nombreProveedor
    })
    fetch(`/cazador/${notificacion.idCazador}/notificaciones`, {
        method: "POST",
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`, {
        method: 'DELETE'
    })
    postNotificacionGeneralCazador(notificacion, 'posible-contrato')
    window.location.reload();
}

const sendConfirmacionCitaCazador = async(event) => {
    let notificacion = event.data
    const datos = await fetch(`/${path.substring(path.lastIndexOf('/') + 1)}/account`)
    let nombreCazador = await datos.json()
    notificacion.nombreCazador = nombreCazador
    notificacion.idCazador = path.substring(path.lastIndexOf('/') + 1)
    body = JSON.stringify({
        type: 'confirmacion',
        id: notificacion.id,
        idProyecto: notificacion.idProyecto,
        nombreProyecto: notificacion.nombreProyecto,
        idProveedor: notificacion.idProveedor,
        nombreProveedor: notificacion.nombreProveedor,
        fecha: notificacion.fecha,
        hora: notificacion.hora,
        idCazador: path.substring(path.lastIndexOf('/') + 1),
        nombreCazador: nombreCazador
    })
    console.log(body)
    fetch(`/talento/${notificacion.idProveedor}/notificaciones`, {
        method: "POST",
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`, {
        method: 'DELETE'
    })
    postNotificacionGeneralCazador(notificacion, 'posible-contrato')
    window.location.reload();
}

const sendNuevaPropuestaProveedor = async(event) => {
    let notificacion = event.data
    const datos = await fetch(`/${path.substring(path.lastIndexOf('/') + 1)}/account`)
    let nombreProveedor = await datos.json()

    body = JSON.stringify({
        type: 'nueva-propuesta',
        id: notificacion.id,
        idProyecto: notificacion.idProyecto,
        idProveedor: path.substring(path.lastIndexOf('/') + 1),
        nombreProveedor: nombreProveedor,
        nombreProyecto: notificacion.nombreProyecto,
        fecha: $(`#${notificacion.id} #fecha-cita`).val(),
        hora: $(`#${notificacion.id} #hora-cita`).val()
    })
    fetch(`/cazador/${notificacion.idCazador}/notificaciones`, {
        method: "POST",
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`, {
        method: "DELETE"
    });
    togglePopUp(notificacion.id);
    window.location.reload();
}

const sendNuevaPropuestaCazador = async(event) => {
    let notificacion = event.data
    const datos = await fetch(`/${path.substring(path.lastIndexOf('/') + 1)}/account`)
    let nombreCazador = await datos.json()

    body = JSON.stringify({
        type: 'nueva-propuesta',
        id: notificacion.id,
        idProyecto: notificacion.idProyecto,
        idCazador: path.substring(path.lastIndexOf('/') + 1),
        nombreCazador: nombreCazador,
        nombreProyecto: notificacion.nombreProyecto,
        fecha: $(`#${notificacion.id} #fecha-cita`).val(),
        hora: $(`#${notificacion.id} #hora-cita`).val()
    })
    fetch(`/talento/${notificacion.idProveedor}/notificaciones`, {
        method: "POST",
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`, {
        method: "DELETE"
    });
    togglePopUp(notificacion.id);
    window.location.reload();
}

const handleNotificacionRechazo = (event) => {
    let notificacion = event.data
    fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`, {
        method: "DELETE"
    });
    togglePopUp(notificacion.id);
    window.location.reload();
}

const mostrarNotificacionesCazador = (datos) => {
    datos.forEach(notificacion => {
        $('.notifi-box').append(
            `<div class="notifi-item" onclick="togglePopUp('${notificacion.id}')">
              <img src="/Img/perfil2.jpg" alt="img">
              <div class="text">
                <h4>${notificacion.nombreProveedor}</h4>
                <p>${notificacion.idProveedor}</p>
                <h5>${notificacion.type}</h5>
              </div>
            </div>`
        )

        if (notificacion.type === 'postulacion') {
            $('.popups').append(
                `<section class="form-bg" id="${notificacion.id}">
          <div class="form">
  
              <h2 class="create">??Nueva postulaci??n!</h2>
              <div class="center-p">
                  <p>${notificacion.nombreProveedor} con un costo por hora de ${notificacion.costoHora} con una reputacion de ${notificacion.reputation} se ha postulado al <a href="">${notificacion.nombreProyecto}</a>. Si le interesa su perfil, ??proponga una cita!</p>
              </div>
              <form class="form-content-date" onsubmit="return false">
  
                  <div class="date-container">
                      <div class="date">
                          <label for="fecha-cita">Fecha de la Cita</label>
                          <input type="date" name="fecha" id="fecha-cita">
                      </div>
                      <div class="time">
                          <label for="hora-cita">Hora de la Cita</label>
                          <input type="time" name="hora" id="hora-cita">
                      </div>
                  </div>
  
                  <div class="confirmation-container">
                      <button class="button negation">
                          Negar postulaci??n </button>
                      <button class="button form-sign-up">
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
            $(`#${notificacion.id} .form-sign-up`).click(notificacion, sendNotificacionPropuesta);
            $(`#${notificacion.id} .negation`).click(notificacion, sendNotificacionRechazo);
        } else if (notificacion.type === 'confirmacion') {
            $('.popups').append(
                `<section class="form-bg" id="${notificacion.id}">
          <div class="form">
              <h2 class="create">??Cita confirmada!</h2>
              <div class="center-p">
                  <p>${notificacion.nombreProveedor} ha aceptado la fecha y hora de la cita propuesta sobre el proyecto <a href="">${notificacion.nombreProyecto}</a></p>
              </div>
              <h3><b>Fecha de la cita:</b> ${notificacion.fecha} ${notificacion.hora}</h3>
              <form class="form-content-date" onsubmit="return false"> 
                  <div class="confirmation-container">
                      <button class="button form-sign-up">
                          Cerrar </button>
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
            $(`#${notificacion.id} .button`).click(notificacion, handleConfirmacion);
        } else if (notificacion.type === 'nueva-propuesta') {
            $('.popups').append(
                `<section class="form-bg" id="${notificacion.id}">
          <div class="form">
              <h2 class="create">??Nueva Propuesta de Cita!</h2>
              <div class="center-p">
                  <p>${notificacion.nombreProveedor} ha hecho una nueva propuesta de cita. ??Funciona para ti?</p>
              </div>
              <h3><b>Fecha propuesta:</b> ${notificacion.fecha} ${notificacion.hora}</h3>
              <form class="form-content-date" onsubmit="return false">
                  <div class="radio radio-cita">
                      <input type="radio" name="usuario" class="accept-date" id="cazador-form" required>
                      <label for="cazador-form" class="cazador-form" onclick="hideOptions()">??Definitivamente!</label>

                      <input type="radio" name="usuario" class="change-date" id="proveedor-form" required>
                      <label for="proveedor-form" class="proveedor-form" onclick="showOptions()">Talvez no...</label>
                  </div>
                  <div id="propose-new">
                      <label for="nombre-sign-up" class="propose">Proponga una fecha y hora alternativa para la
                          cita</label>
                      <div class="date-container">
                      <div class="date">
                          <label for="fecha-cita">Fecha de la Cita</label>
                          <input type="date" name="fecha" id="fecha-cita">
                      </div>
                      <div class="time">
                          <label for="hora-cita">Hora de la Cita</label>
                          <input type="time" name="hora" id="hora-cita">
                      </div>
                      </div>
                  </div>

                  <div class="confirmation-container">
                      <button class="button negation-talento">
                          Cancelar </button>
                      <button class="button form-sign-up">
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
      $(`#${notificacion.id} .form-sign-up`).click(notificacion, handleRespuestaPropuestaCazador);
      $(`#${notificacion.id} .cazador-form`).click({id: notificacion.id, show: false}, toggleNuevaPropuesta)
      $(`#${notificacion.id} .proveedor-form`).click({id: notificacion.id, show: true}, toggleNuevaPropuesta)
    }  else if (notificacion.type === 'posible-contrato') {
      $('.popups').append(
        `<section class="form-bg" id="${notificacion.id}">
          <div class="form">
              <h2 class="create">??Cita Terminada!</h2>
              <div class="center-p">
                  <p>Le gustria hacer una oferta de trabajo por 6 meses a ${notificacion.nombreProveedor}?</p>
              </div>
              <form class="form-content-date" onsubmit="return false">
                  <div class="radio radio-cita">
                      <input type="radio" name="usuario" class="accept-date" id="cazador-form" required>
                      <label for="cazador-form" class="cazador-form" onclick="hideOptions()">??Definitivamente!</label>

                      <input type="radio" name="usuario" class="change-date" id="proveedor-form" required>
                      <label for="proveedor-form" class="proveedor-form" onclick="showOptions()">Mejor no</label>
                  </div>
                  <div class="confirmation-container">
                      <button class="button negation-talento" onclick="togglePopUp('${notificacion.id}')">
                          Cancelar </button>
                      <button class="button form-sign-up" id="${notificacion.id}-ofrecer-contrato">
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
      $(`#${notificacion.id} .cazador-form`).click({id: notificacion.id, show: false}, toggleNuevaPropuesta)
      $(`#${notificacion.id} .proveedor-form`).click({id: notificacion.id, show: true}, toggleNuevaPropuesta)
      $(`#${notificacion.id}-ofrecer-contrato`).click(notificacion, handlePosibleContratoCazador)
    } else if (notificacion.type === 'oferta-aceptada') {
      $('.popups').append(
        `<section class="form-bg" id="${notificacion.id}">
          <div class="form">
              <h2 class="create">Oferta de Contrato aceptada!</h2>
              <div class="center-p">
                  <p>${notificacion.nombreProveedor} ha aceptado el contrato para trabajar en proyecto <a href="">${notificacion.nombreProyecto}</a></p>
              </div>
              <form class="form-content-date" onsubmit="return false"> 
                  <div class="confirmation-container">
                      <button class="button form-sign-up">
                          Cerrar </button>
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
      $(`#${notificacion.id} .button`).click(notificacion, handleConfirmacion);
    } else if (notificacion.type === 'review-proveedor') {
      $('.popups').append(
        `<section class="form-bg" id="${notificacion.id}">
          <div class="form">
              <h2 class="create">Trabajo terminado, hora de revisar!</h2>
              <div class="center-p">
                  <p>Califique del 1-5 a ${notificacion.nombreProveedor} sobre el trabajo realizado en <a href="">${notificacion.nombreProyecto}</a></p>
              </div>
              <form class="form-content-date" onsubmit="return false"> 
                <div class="radio radio-cita">
                  <input type="range" min="1" max="5" value="3" class="slider" id="${notificacion.id}-slider"">
                </div>
                  <div class="confirmation-container">
                      <button class="button negation" onclick="togglePopUp('${notificacion.id}')">
                          Cerrar </button>
                      <button class="button form-sign-up" id="${notificacion.id}-eval">
                          Evaluar </button>
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
      $(`#${notificacion.id} .form-sign-up`).click(notificacion, handleEvaluacionCazador);
    }
  })
}

const mostrarNotificacionesTalento = (datos) => {
    datos.forEach(notificacion => {
        $('.notifi-box').append(
            `<div class="notifi-item" onclick="togglePopUp('${notificacion.id}')">
        <img src="/Img/perfil2.jpg" alt="img">
        <div class="text">
          <h4>${notificacion.nombreCazador}</h4>
          <p>${notificacion.idCazador}</p>
          <p>${notificacion.type}</p>
        </div>
      </div>`
        )

        if (notificacion.type === 'propuesta') {
            $('.popups').append(
                `<section class="form-bg" id="${notificacion.id}">
          <div class="form">
              <h2 class="create">??Postulaci??n aceptada!</h2>
              <div class="center-p">
                  <p>${notificacion.nombreCazador}, el responsable de <a href="">${notificacion.nombreProyecto}</a> ha aceptado tu postulaci??n y quiere tener una cita contigo. ??Funciona para ti?</p>
              </div>
              <h3><b>Fecha propuesta:</b> ${notificacion.fecha} ${notificacion.hora}</h3>
              <form class="form-content-date" onsubmit="return false">
                  <div class="radio radio-cita">
                      <input type="radio" name="usuario" class="accept-date" id="cazador-form" required>
                      <label for="cazador-form" class="cazador-form" onclick="hideOptions()">??Definitivamente!</label>
  
                      <input type="radio" name="usuario" class="change-date" id="proveedor-form" required>
                      <label for="proveedor-form" class="proveedor-form" onclick="showOptions()">Talvez no...</label>
                  </div>
                  <div id="propose-new">
                      <label for="nombre-sign-up" class="propose">Proponga una fecha y hora alternativa para la
                          cita</label>
                      <div class="date-container">
                      <div class="date">
                          <label for="fecha-cita">Fecha de la Cita</label>
                          <input type="date" name="fecha" id="fecha-cita">
                      </div>
                      <div class="time">
                          <label for="hora-cita">Hora de la Cita</label>
                          <input type="time" name="hora" id="hora-cita">
                      </div>
                      </div>
                  </div>
  
                  <div class="confirmation-container">
                      <button class="button negation-talento">
                          Cancelar </button>
                      <button class="button form-sign-up">
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
            $(`#${notificacion.id} .form-sign-up`).click(notificacion, handleRespuestaPropuestaProveedor);
            $(`#${notificacion.id} .cazador-form`).click({ id: notificacion.id, show: false }, toggleNuevaPropuesta)
            $(`#${notificacion.id} .proveedor-form`).click({ id: notificacion.id, show: true }, toggleNuevaPropuesta)
        } else if (notificacion.type === 'rechazo') {
            $('.popups').append(
                `<section class="form-bg" id="${notificacion.id}">
          <div class="form" >
              <h2 class="create">??Postulaci??n rechazada!</h2>
              <div class="center-p">
                  <p>Desgraciadamente, su postulaci??n a <a href="">${notificacion.nombreProyecto}</a> ha sido rechazada</p>
                  <p>No se rinda y siga postulandose a m??s proyectos</p>
              </div>
              <form class="form-content-date" onsubmit="return false">
                  <div class="confirmation-container">
                      <button class="button form-sign-up">
                          Cerrar </button>
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
            $(`#${notificacion.id} .button`).click(notificacion, handleNotificacionRechazo);
        } else if (notificacion.type === 'confirmacion') {
            $('.popups').append(
                `<section class="form-bg" id="${notificacion.id}">
          <div class="form">
              <h2 class="create">??Cita confirmada!</h2>
              <div class="center-p">
                  <p>${notificacion.nombreCazador} ha aceptado la fecha y hora de la cita propuesta sobre el proyecto <a href="">${notificacion.nombreProyecto}</a></p>
              </div>
              <h3><b>Fecha de la cita:</b> ${notificacion.fecha} ${notificacion.hora}</h3>
              <form class="form-content-date" onsubmit="return false"> 
                  <div class="confirmation-container">
                      <button  class="button form-sign-up">
                          Cerrar </button>
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
            $(`#${notificacion.id} .button`).click(notificacion, handleConfirmacion);
        } else if (notificacion.type === 'nueva-propuesta') {
            $('.popups').append(
                `<section class="form-bg" id="${notificacion.id}">
          <div class="form">
              <h2 class="create">??Nueva Propuesta de Cita!</h2>
              <div class="center-p">
                  <p>${notificacion.nombreCazador}, el responsable de <a href="">${notificacion.nombreProyecto}</a> ha hecho una nueva propuesta de cita. ??Funciona para ti?</p>
              </div>
              <h3><b>Fecha propuesta:</b> ${notificacion.fecha} ${notificacion.hora}</h3>
              <form class="form-content-date" onsubmit="return false">
                  <div class="radio radio-cita">
                      <input type="radio" name="usuario" class="accept-date" id="cazador-form" required>
                      <label for="cazador-form" class="cazador-form" onclick="hideOptions()">??Definitivamente!</label>

                      <input type="radio" name="usuario" class="change-date" id="proveedor-form" required>
                      <label for="proveedor-form" class="proveedor-form" onclick="showOptions()">Talvez no...</label>
                  </div>
                  <div id="propose-new">
                      <label for="nombre-sign-up" class="propose">Proponga una fecha y hora alternativa para la
                          cita</label>
                      <div class="date-container">
                      <div class="date">
                          <label for="fecha-cita">Fecha de la Cita</label>
                          <input type="date" name="fecha" id="fecha-cita">
                      </div>
                      <div class="time">
                          <label for="hora-cita">Hora de la Cita</label>
                          <input type="time" name="hora" id="hora-cita">
                      </div>
                      </div>
                  </div>

                  <div class="confirmation-container">
                      <button  class="button negation-talento">
                          Cancelar </button>
                      <button class="button form-sign-up">
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
      $(`#${notificacion.id} .form-sign-up`).click(notificacion, handleRespuestaPropuestaProveedor);
      $(`#${notificacion.id} .cazador-form`).click({id: notificacion.id, show: false}, toggleNuevaPropuesta)
      $(`#${notificacion.id} .proveedor-form`).click({id: notificacion.id, show: true}, toggleNuevaPropuesta)
    }  else if (notificacion.type === 'oferta-contrato') {
      $('.popups').append(
        `<section class="form-bg" id="${notificacion.id}">
          <div class="form">
              <h2 class="create">??Nueva Oferta de Contrato!</h2>
              <div class="center-p">
                  <p>${notificacion.nombreCazador}, el responsable de <a href="">${notificacion.nombreProyecto}</a> le ha ofrecido trabajar en el proyecto por 6 meses. Acepta? </p>
              </div>
              <form class="form-content-date" onsubmit="return false">
                  <div class="radio radio-cita">
                      <input type="radio" name="usuario" class="accept-date" id="cazador-form" required>
                      <label for="cazador-form" class="cazador-form" onclick="hideOptions()">??Definitivamente!</label>

                      <input type="radio" name="usuario" class="change-date" id="proveedor-form" required>
                      <label for="proveedor-form" class="proveedor-form" onclick="showOptions()">Mejor no</label>
                  </div>
                  <div class="confirmation-container">
                      <button class="button negation-talento" onclick="togglePopUp('${notificacion.id}')">
                          Cancelar </button>
                      <button class="button form-sign-up" id="${notificacion.id}-ofrecer-contrato">
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
      $(`#${notificacion.id} .cazador-form`).click({id: notificacion.id, show: false}, toggleNuevaPropuesta)
      $(`#${notificacion.id} .proveedor-form`).click({id: notificacion.id, show: true}, toggleNuevaPropuesta)
      $(`#${notificacion.id}-ofrecer-contrato`).click(notificacion, handlePosibleContratoProveedor)
    } else if (notificacion.type === 'review-cazador') {
      $('.popups').append(
        `<section class="form-bg" id="${notificacion.id}">
          <div class="form">
              <h2 class="create">Trabajo terminado, hora de revisar!</h2>
              <div class="center-p">
                  <p>Califique del 1-5 a ${notificacion.nombreCazador} sobre la experiencia trabajando en <a href="">${notificacion.nombreProyecto}</a></p>
              </div>
              <form class="form-content-date" onsubmit="return false"> 
                <div class="radio radio-cita">
                  <input type="range" min="1" max="5" value="3" class="slider" id="${notificacion.id}-slider"">
                </div>
                  <div class="confirmation-container">
                      <button class="button negation" onclick="togglePopUp('${notificacion.id}')">
                          Cerrar </button>
                      <button class="button form-sign-up" id="${notificacion.id}-eval">
                          Evaluar </button>
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
      $(`#${notificacion.id} .form-sign-up`).click(notificacion, handleEvaluacionProveedor);
    }
  })
}

const postNotificacionGeneralCazador = async(notificacion, type) => {
    console.log(notificacion)
    body = JSON.stringify({
        type: type,
        id: notificacion.id + type,
        idProyecto: notificacion.idProyecto,
        nombreProyecto: notificacion.nombreProyecto,
        idProveedor: notificacion.idProveedor,
        nombreProveedor: notificacion.nombreProveedor,
        idCazador: notificacion.idCazador,
        nombreCazador: notificacion.nombreCazador
    })
    fetch(`/cazador/${notificacion.idCazador}/notificaciones`, {
        method: "POST",
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`, {
        method: 'DELETE'
    })
    window.location.reload()
}

const handlePosibleContratoCazador = async(event) => {
    let notificacion = event.data

    if ($(`#${notificacion.id} .accept-date`).is(':checked')) {
        postNotificacionGeneralTalento(notificacion, 'oferta-contrato');
    } else if ($(`#${notificacion.id} .change-date`).is(':checked')) {
        sendNotificacionRechazo(event)
    }
}

const postNotificacionGeneralTalento = async(notificacion, type) => {
    body = JSON.stringify({
        type: type,
        id: notificacion.id + type,
        idProyecto: notificacion.idProyecto,
        nombreProyecto: notificacion.nombreProyecto,
        idProveedor: notificacion.idProveedor,
        nombreProveedor: notificacion.nombreProveedor,
        idCazador: notificacion.idCazador,
        nombreCazador: notificacion.nombreCazador
    })
    fetch(`/talento/${notificacion.idProveedor}/notificaciones`, {
        method: "POST",
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`, {
        method: 'DELETE'
    })
    window.location.reload()
}

const handlePosibleContratoProveedor = (event) => {
    let notificacion = event.data
    if ($(`#${notificacion.id} .accept-date`).is(':checked')) {
        postNotificacionGeneralCazador(notificacion, 'oferta-aceptada');
        postNotificacionGeneralCazador(notificacion, 'review-proveedor');
    }
}

const handleEvaluacionCazador = event => {
  let notificacion = event.data
  fetch(`/reputation/${notificacion.idProveedor}`, {
    method: "POST",
    body: JSON.stringify({
      score: $(`#${notificacion.id}-slider`).val()
    }),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  })
  postNotificacionGeneralTalento(notificacion, 'review-cazador');
  fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`,{
    method: 'DELETE'
  })
  window.location.reload()
}

const handleEvaluacionProveedor = event => {
  let notificacion = event.data
  fetch(`/reputation/${notificacion.idCazador}`, {
    method: "POST",
    body: JSON.stringify({
      score: $(`#${notificacion.id}-slider`).val()
    }),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  })
  fetch(`${window.location.pathname}/notificaciones/${notificacion.id}`,{
    method: 'DELETE'
  })
  window.location.reload()
}


let path = window.location.pathname
if (path.includes('cazador')) {
    getNotificacionesCazador(path.substring(path.lastIndexOf('/') + 1)).then(datos => mostrarNotificacionesCazador(datos));
} else if (path.includes('talento')) {
    getNotificacionesTalento(path.substring(path.lastIndexOf('/') + 1)).then(datos => mostrarNotificacionesTalento(datos));
}

const getHistorial = async () => {
  let userinfo = await fetch(`/login/${path.substring(path.lastIndexOf('/') + 1)}/new-account`)
  let usuario = await userinfo.json()
  let reputation = await fetch(`/login/${path.substring(path.lastIndexOf('/') + 1)}/reputation`)
  let rep = await reputation.json()

  $(`#lista-historial`).append(`<li>Reputaci??n actual: ${rep.toFixed(2)}`)
  usuario[0].reputacion.forEach(reputation => {
    $(`#lista-historial`).append(`<li>Reputaci??n: ${reputation.reputation}, fecha: ${reputation.fecha}</li>`)
  })
}

getHistorial();