/*-----------------------------------------------------------------------------
 * servidor web
*----------------------------------------------------------------------------*/
const { sendNotificacionesCazador, sendNotificacionesTalento } = require("./private/API_notificaciones");

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(request,response){
    response.sendFile(__dirname + '/public/login.html');
});

app.get('/login', function(request, response) {
    response.redirect(301,'/');
  });

app.get('/cazador', function(request,response){
    response.sendFile(__dirname + '/public/cazador.html');
});

app.get('/cazador/notificaciones', sendNotificacionesCazador)

app.get('/talento', function(request,response){
    response.sendFile(__dirname + '/public/talento.html');
});

app.listen(3000,function(){
    console.log("Running Express");
});
