/*-----------------------------------------------------------------------------
 * servidor web
 *----------------------------------------------------------------------------*/

var express = require('express');
var app = express();

var notificacionesCazador = [
    {
        idCazador: '@Bas',
        notificaciones: [
            {
                id: '123abc',
                idProveedor: '@alejandro',
                nombreProveedor: 'Alejandro Oliva',
                idProyecto: 'proyecto1',
                nombreProyecto: 'Proyecto 1'
            },
            {
                id: '456dfe',
                idProveedor: '@dulce',
                nombreProveedor: 'Dulce Garcia',
                idProyecto: 'proyecto1',
                nombreProyecto: 'Proyecto 1'
            }
        ]
    }
]

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

app.get('/cazador/notificaciones', function(request, response){
    response.json(notificacionesCazador[0].notificaciones)
})

app.get('/talento', function(request,response){
    response.sendFile(__dirname + '/public/talento.html');
});

app.listen(3000,function(){
    console.log("Running Express");
});
