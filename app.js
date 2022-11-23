/*-----------------------------------------------------------------------------
 * servidor web
 *----------------------------------------------------------------------------*/
const {
    sendNotificacionesCazador,
    deleteNotificacionCazador,
    postNotificacionCazador,
    sendNotificacionesTalento,
    deleteNotificacionTalento,
    postNotificacionTalento,
} = require("./private/API_notificaciones");

const {
    getCredenciales,
    updateCredentials,
    getNameFromID,
    getUserInfo,
    avgReputation
} = require("./private/API_accounts");

const {
    getProyectos,
    postNuevoProyecto,
    putStatusProyecto,
    getNameProyectoFromID,
    getProyectoInfo
} = require('./private/API_projects')

/*----------------------------------------------------------------------------*/

var express = require('express');
var bodyParser = require('body-parser')
var app = express();


app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/login.html');
});

app.get('/login', function(request, response) {
    response.redirect(301, '/');
});

app.get('/:id/account', getNameFromID);

app.get('/login/authentication', getCredenciales)
app.post('/login/:id/new-account', updateCredentials)
app.get('/login/:id/new-account', getUserInfo)
app.get('/login/:id/reputation', avgReputation)

app.get('/cazador/:id', function(request, response) {
    response.sendFile(__dirname + '/public/cazador.html');
});

app.get('/cazador/:id/notificaciones', sendNotificacionesCazador);
app.post('/cazador/:id/notificaciones', postNotificacionCazador)
app.delete('/cazador/:id/notificaciones/:idNotificacion', deleteNotificacionCazador);

app.get('/talento/:id', function(request, response) {
    response.sendFile(__dirname + '/public/talento.html');
});

app.get('/talento/:id/notificaciones', sendNotificacionesTalento);
app.post('/talento/:id/notificaciones', postNotificacionTalento);
app.delete('/talento/:id/notificaciones/:idNotificacion', deleteNotificacionTalento)

app.get('/proyectos', getProyectos)
app.get('/proyectos/:id', getProyectos)
app.get('/speed-date', getSpeedDate)
app.post('/proyectos/:id', postNuevoProyecto)
app.put('/proyectos/:id/:status', putStatusProyecto)
app.get('/proyectos/:idCazador', getNoProyectosCazador)

app.listen(3000, function() {
    console.log("Running Express");
});