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

const postNewProject = async(nombre,coordenadas,tipo,giro) => {
    fetch(`/cazador/${id}`, {
        method: "POST",
        body: JSON.stringify({
            nombre: nombre,
            coordenadas: coordenadas,
            tipo: tipo,
            giro: giro
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

const mostrarProyectoCazador = (proyectos) => {
    proyectos.forEach(proyecto => {
        $('.proyectos-body').append(
            `<tr>
                <td>${proyecto.nombreProyecto}</td>
                <td>${proyecto.giro}</td>
                <td>${proyecto.coordenadas}</td>
                <td>${proyecto.cuota}</td>
                <td><span class="status delivered">${proyecto.status}</span></td>
            </tr>`
        )
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