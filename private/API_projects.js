var proyectosExistentes = [
    {
        idProyecto: 'proyectoamextra',
        nombreProyecto: 'Proyecto AMEXTRA',
        giro: 'Se trata de una organización sin fines de lucro que se encarga de ayudar a las comunidades rurales más vulnerables de México a través de distintos programas de apoyo que son financiados a través de donaciones, dichos recursos provienen de todos aquellos que deciden convertirse en colaboradores de la organización.',
        coordenadas: 'La Otra Banda 54-Casa C, 01000 Ciudad de México, Ciudad de México',
        cuota: '$100.90',
        status: 'disponible',
        idCazador: '@bas',
        horarios: {
            fecha1: '2022-11-03',
            fecha2: '2022-11-11',
            fecha3: '2022-12-08',
            horario1: '18:15',
            horario2: '18:18',
            horario3: '18:20'
          }
    },
    {
        idProyecto: 'proyectoconsulting',
        nombreProyecto: 'Consulting Center',
        giro: 'El objetivo principal del departamento de Reclutamiento es presentar a la marca Audi México como un empleador atractivo para el mercado laboral externo.',
        coordenadas: 'San José Chiapa, CP.23890 Puebla, Puebla Mexico.',
        cuota: '$95.50',
        status: 'ninguno',
        idCazador: '@bas',
        horarios: {}
    },
]

const getProyectos = function(request, response) {
    if (request.params.id) {
        let proyectos = []
        proyectosExistentes.forEach(proyecto => {
            if (proyecto.idCazador === request.params.id) {
                proyectos.push(proyecto)
            }
        })
        response.json(proyectos)
    } else {
        response.json(proyectosExistentes)
    }
}

const getNoProyectosCazador = function(idCazador){
    let proyectos = [];
    proyectosExistentes.forEach(proyecto => {
        if (proyecto.idCazador === idCazador) {
            proyectos.push(proyecto)
        }
    })
    return proyectos.length
}

const postNuevoProyecto = (request, response) => {
    let proyectoNuevo = request.body;
    console.log(proyectoNuevo)
    let noProyectos = getNoProyectosCazador(request.params.id)
    cuota = `$${(100-noProyectos*5)}`
    proyectosExistentes.unshift({
        idProyecto: proyectoNuevo.nombreProyecto.replace(/\s/g, '').toLowerCase(),
        nombreProyecto: proyectoNuevo.nombreProyecto,
        giro: proyectoNuevo.giro,
        coordenadas: proyectoNuevo.coordenadas,
        cuota: cuota,
        status: 'ninguno', 
        idCazador: request.params.id
    })
}

const putStatusProyecto = (request, response) => {
    proyectosExistentes.forEach(proyecto => {
        if (proyecto.idProyecto === request.params.id) {
            if (request.params.status === 'ninguno'){
                proyecto.horarios = {}
            } else if ( request.params.status === 'disponible') {
                proyecto.horarios = request.body
                console.log(proyecto)
            }
            proyecto.status = request.params.status;
        } 
    })
}

const getSpeedDate = (request, response) => {
    let proyectosCandidatos = []
    proyectosExistentes.forEach(proyecto => {
        if (proyecto.status === 'disponible') {
            proyectosCandidatos.push(proyecto);
        }
    })
    let index = Math.floor(Math.random() * proyectosCandidatos.length)
    response.json(proyectosCandidatos[index])
}

const getNameProyectoFromID = function(request, response) {
    let proyectos = [];
    proyectosExistentes.forEach(proyecto => {
        if (proyecto.id === request.params.id) {
            proyectos = proyecto.nombre;
        }
    })
    response.json(proyectos)
}

const getProyectoInfo = function(request, response) {
    var result = proyectosExistentes.filter(x => x.id === request.params.id);
    response.json(result)
}


module.exports = {
    getProyectos, postNuevoProyecto, getNameProyectoFromID, getProyectoInfo, putStatusProyecto, getSpeedDate,getNoProyectosCazador
}
