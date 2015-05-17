var express = 	require("express"),
	app		= 	express(), 
	cons 	=	require("consolidate"), 
	puerto 	= 	8081, 
	bodyParser 	= require('body-parser'),
  http = require('http').Server(app),
  io = require('socket.io')(http);

//consolidate integra swig con express...
app.engine("html", cons.swig); //Template engine...
app.set("view engine", "html");
app.set("views", __dirname + "/vistas");
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res)
{
  res.render("index", {
    titulo  :   "Comentarios UDEC"
  });
});

// Invoca las conexiones 
io.on('connection', function(socket){
  console.log('Usuario Conectado');
 //socket.broadcast.emit('hi');
 // Captura Mensaje
  socket.on('comentario', function(msg){
    console.log('message: ' + msg);
    io.emit('comentario', msg);
  });
//Invoca la desconexion del usuario cuando sucede
  socket.on('disconnect', function(){
    console.log('Usuario desconectado');
  });
});





app.listen(puerto);
console.log("Express server iniciado en el " + puerto);