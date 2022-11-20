/*-----------------------------------------------------------------------------
 * servidor web
*----------------------------------------------------------------------------*/
const { sendNotificacionesCazador, deleteNotificacionCazador, 
    sendNotificacionesTalento, deleteNotificacionTalento, 
    postNotificacionTalento } = require("./private/API_notificaciones");

var express = require('express');
var bodyParser = require('body-parser')
var app = express();


app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))

app.get('/', function(request,response){
    response.sendFile(__dirname + '/public/login.html');
});

app.get('/login', function(request, response) {
    response.redirect(301,'/');
  });

app.get('/cazador/:id', function(request,response){
    response.sendFile(__dirname + '/public/cazador.html');
});

app.get('/cazador/:id/notificaciones', sendNotificacionesCazador);
app.delete('/cazador/:id/notificaciones/:idNotificacion', deleteNotificacionCazador);


app.get('/talento/:id', function(request,response){
    response.sendFile(__dirname + '/public/talento.html');
});

app.get('/talento/:id/notificaciones', sendNotificacionesTalento);
app.post('/talento/:id/notificaciones', postNotificacionTalento);
app.delete('/talento/:id/notificaciones/:idNotificacion', deleteNotificacionTalento)

app.listen(3000,function(){
    console.log("Running Express");
});
