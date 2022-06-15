//PASO 2
//utilizamos el tipo de objeto que usa mongoose por lo que requerimos mongoose
const mongoose = require('mongoose')

//en mongoose los modelos se llaman esquemas
var Schema = mongoose.Schema

//Para poder crear una instancia con el nombre que yo quiero primero tengo que hacer var Schema = mongoose.Schema
var NoteSchema = new Schema({ //NoteSchema es como una clase. => Empezar el nombre en mayúsculas
    author: String,
    title: String,
    note:String,
    date: {type: Date, default: Date.now}
})

//exportar el modelo (con los atributos que hemos establecido antes)
module.exports = mongoose.model('Note', NoteSchema) //le paso a model el nombre que tendrá este esquema en la BBDD y los atributos que hemos establecido antes
