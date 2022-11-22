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
    let nuevoStatus = 'disponible'
    if (status === 'disponible') {
        nuevoStatus = 'ninguno'
    }
    fetch(`/proyectos/${idProyecto}/${nuevoStatus}`, {
        method: "PUT",
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
    });
}

const mostrarProyectoTalento= (proyectos) => {
    proyectos.forEach(proyecto => {
        $('.proyectos-body').append(
            `<tr id="${proyecto.idProyecto}">
                <td>${proyecto.nombreProyecto}</td>
                <td>${proyecto.giro}</td>
                <td>${proyecto.coordenadas}</td>
                <td>${proyecto.cuota}</td>
                <td><span class="status delivered">${proyecto.status}</span></td>
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

path = window.location.pathname
if (path.includes('cazador')){
  getProyectosCazador(path.substring(path.lastIndexOf('/') + 1)).then(proyectos => mostrarProyectoCazador(proyectos));
} 
else if (path.includes('talento')) {
  getProyectosProveedor().then(proyectos => mostrarProyectoTalento(proyectos));
}
