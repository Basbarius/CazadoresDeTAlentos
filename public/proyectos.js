// postNewProject(nombre,coordenadas,tipo,giro)

const getProyectosCazador = async (idCazador) => {
    let res = await fetch (`/proyectos/${idCazador}`)
    let proyectos = await res.json()
    return proyectos
}

const getProyectosProveedor = async () => {
    let res = await fetch (`/proyectos`)
    let proyectos = await res.json()
    return proyectos
}

const postNuevoProyecto = async () => {
    fetch(`/proyectos/${path.substring(path.lastIndexOf('/') + 1)}`, {
        method: "POST",
        body: JSON.stringify({
            nombreProyecto: $('#nombre-proyecto').val(),
            giro: $('#giro-proyecto').val(),
            coordenadas: $('#coordenadas-proyecto').val(),
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    window.location.reload();
}

const toggleStatus = (event) => {
    let idProyecto = event.data.idProyecto
    let status = event.data.status
    if (status === 'disponible') {
        let nuevoStatus = 'ninguno'
        fetch(`/proyectos/${idProyecto}/${nuevoStatus}`, {
            method: "PUT",
        })
        window.location.reload()
    } else {
        togglePopUp(`${idProyecto}-horarios`)
    }
}

const postHorariosSpeedDate = (event) => {
    let idProyecto = event.data.idProyecto
    let fecha1 = $(`#${idProyecto}-fecha-cita-1`).val()
    let fecha2 = $(`#${idProyecto}-fecha-cita-2`).val()
    let fecha3 = $(`#${idProyecto}-fecha-cita-3`).val()
    let horario1 = $(`#${idProyecto}-hora-cita-1`).val()
    let horario2 = $(`#${idProyecto}-hora-cita-2`).val()
    let horario3 = $(`#${idProyecto}-hora-cita-3`).val()
    let nuevoStatus = 'disponible'
    let body = JSON.stringify({
        fecha1,
        fecha2, 
        fecha3,
        horario1,
        horario2,
        horario3
    })
    console.log(body)
    fetch(`/proyectos/${idProyecto}/${nuevoStatus}`, {
        method: "PUT",
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    window.location.reload()
}

const mostrarProyectoCazador = (proyectos) => {
    proyectos.forEach(proyecto => {
        let claseStatus = 'wait'
        if (proyecto.status === 'disponible') {
            claseStatus = 'delivered'
        }
        $('.proyectos-body').append(
            `<tr id="${proyecto.idProyecto}">
                <td>${proyecto.nombreProyecto}</td>
                <td>${proyecto.giro}</td>
                <td>${proyecto.coordenadas}</td>
                <td>${proyecto.cuota}</td>
                <td><span class="status ${claseStatus}">${proyecto.status}</span></td>
                <td><button class="inscrip">Cambiar Status</button></td>
            </tr>`
        )
        $(`#${proyecto.idProyecto} .inscrip`).click({idProyecto: proyecto.idProyecto, status: proyecto.status}, toggleStatus);
        $('.popups').append(
            `<section class="form-bg" id="${proyecto.idProyecto}-horarios">
                <div class="form">
        
                    <h2 class="create">Nuevo Speed Date</h2>
                    <div class="center-p">
                        <p>Por favor ingrese tres opciones de cita para speed date con el proyecto <a href="">${proyecto.nombreProyecto}</a></p>
                    </div>
                    <form class="form-content-date" onsubmit="return false">
        
                        <div class="date-container">
                            <div class="date">
                                <label for="fecha-cita-1">Fecha de la Cita</label>
                                <input type="date" name="fecha" id="${proyecto.idProyecto}-fecha-cita-1" required>
                            </div>
                            <div class="time">
                                <label for="hora-cita-1">Hora de la Cita</label>
                                <input type="time" name="hora" id="${proyecto.idProyecto}-hora-cita-1" required>
                            </div>
                        </div>
                        <div class="date-container">
                            <div class="date">
                                <input type="date" name="fecha" id="${proyecto.idProyecto}-fecha-cita-2" required>
                            </div>
                            <div class="time">
                                <input type="time" name="hora" id="${proyecto.idProyecto}-hora-cita-2" required>
                            </div>
                        </div>
                        <div class="date-container">
                            <div class="date">
                                <input type="date" name="fecha" id="${proyecto.idProyecto}-fecha-cita-3" required>
                            </div>
                            <div class="time">
                                <input type="time" name="hora" id="${proyecto.idProyecto}-hora-cita-3" required>
                            </div>
                        </div>
                        <div class="confirmation-container">
                            <button class="button negation" onclick="togglePopUp('${proyecto.idProyecto}-horarios')">
                                Cancelar</button>
                            <button class="button form-sign-up">
                                Proponer cita </button>
                        </div>
                        <div class="close-form" onclick="togglePopUp('${proyecto.idProyecto}-horarios')">
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
        $(`#${proyecto.idProyecto}-horarios .form-sign-up`).click(proyecto, postHorariosSpeedDate);
    });
}

const mostrarProyectoTalento= (proyectos) => {
    proyectos.forEach(proyecto => {
        let claseStatus = 'wait'
        if (proyecto.status === 'disponible') {
            claseStatus = 'delivered'
        }
        $('.proyectos-body').append(
            `<tr id="${proyecto.idProyecto}">
                <td>${proyecto.nombreProyecto}</td>
                <td>${proyecto.giro}</td>
                <td>${proyecto.coordenadas}</td>
                <td><span class="status ${claseStatus}">${proyecto.status}</span></td>
                <td><button class="inscrip">Inscribirse</button></td>
            </tr>`
        )
        $(`#${proyecto.idProyecto} .inscrip`).click(proyecto, sendNotificacionPostulacion)
    });
}

const enviarProyectoTalento = (datos) => {
    datos.forEach(proyecto => {
        $('.proyectos').append(
            `<div class="allProjects">
                <table id="tabla_Proyecto">
                    <thead>
                        <tr>
                            <td> Nombre </td>
                            <td> Giro del proyecto </td>
                            <td> Coordenadas </td>
                            <td> Couta </td>
                            <td> Status </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${proyecto.nombre}</td>
                            <td>${proyecto.giro}</td>
                            <td>${proyecto.coordenadas}</td>
                        </tr>
                    </tbody>
                </table>
            </div>`
        )
    });
}

const postSpeedDate = (event) => {
    let proyecto = event.data 
    
    let id = proyecto.idProyecto + path.substring(path.lastIndexOf('/') + 1)
    id = id.replace('@', '-')

    let fecha = ''
    let hora = ''
    if ($('#fecha-hora-1').is(':checked')) {
        fecha = proyecto.horarios.fecha1
        hora = proyecto.horarios.horario1
    } else if ($('#fecha-hora-2').is(':checked')) {
        fecha = proyecto.horarios.fecha2
        hora = proyecto.horarios.horario2
    } else if ($('#fecha-hora-3').is(':checked')) {
        fecha = proyecto.horarios.fecha3
        hora = proyecto.horarios.horario3
    }

    sendConfirmacionCitaProveedor({
        data: {
            id: id,
            idProyecto: proyecto.idProyecto,
            nombreProyecto: proyecto.nombreProyecto,
            fecha: fecha,
            hora: hora,
            idCazador: proyecto.idCazador
        }
    });
    window.location.reload()
}

const searchSpeedDate = async () => {
    let datos = await fetch('/speed-date')    
    let proyecto = await datos.json()
    $('#anchor-project-name').text(`${proyecto.nombreProyecto}`)
    $('.f1').text(`${proyecto.horarios.fecha1}, ${proyecto.horarios.horario1}`)
    $('.f2').text(`${proyecto.horarios.fecha2}, ${proyecto.horarios.horario2}`)
    $('.f3').text(`${proyecto.horarios.fecha3}, ${proyecto.horarios.horario3}`)

    $('#hacer-cita').click(proyecto, postSpeedDate)
    togglePopUp('form-bg-speed-date')
}

path = window.location.pathname
if (path.includes('cazador')){
  getProyectosCazador(path.substring(path.lastIndexOf('/') + 1)).then(proyectos => mostrarProyectoCazador(proyectos));
} 
else if (path.includes('talento')) {
  getProyectosProveedor().then(proyectos => mostrarProyectoTalento(proyectos));
}
