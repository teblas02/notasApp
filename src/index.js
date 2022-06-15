//PASO 1
const express = require('express')
const path =require('path') //modulo que pertenece a express
const app = express() //const como podría ser var pero en este caso mejor así

//PASO 2
const mongoose = require('mongoose')
mongoose.Promise = global.Promise //para no tener problemas con la conexión
const urlDbb = "mongodb+srv://teblas02:EtsinfUPV2020@cluster0.sro62.mongodb.net/?retryWrites=true&w=majority" //url de la base de datos
//cambiar password por la contraseña, quitando los <>

//PASO 3
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false})); //se pone a false
app.use(bodyParser.json()); //formato JSON

const noteRoutes = require('./routes/note'); 

//PASO 1
const port = 3000;
app.use(express.static(path.join(__dirname, 'public'))) //buscamos los archivos státicos que esten en el path. Busca en los archivos hasta encontrar 'public'.
//Una vez encontrado busca el fichero index.html

//PASO 3. Cargamos los archivos de ruta
app.use('/api', noteRoutes)//a partir de que ruta vamos a cargar los archivos (ruta principal)


//PASO 2
mongoose.connect(urlDbb, {useNewUrlParser: true}, ()=>{ //{useNewUrlParser: true} para la codificación de la info
    console.log('Conexión a la bdd realizada con éxito')
    app.listen(port, ()=>{ //un callback es una función que se ejecuta cuando se ejecuta otra función
        console.log('App lanzada en el puerto ' + port)
    })
}) 

/*//PASO 1.- Lanzamos la aplicación a través del puerto 3000
app.listen(port, ()=>{ //un callback es una función que se ejecuta cuando se ejecuta otra función
    console.log('App lanzada en el puerto ' + port)
})
(cambiamos de sitio esta parte de código en el paso 2)
*/
