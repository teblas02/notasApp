//CONTROLADOR
//PASO 2
//es la parte principal. Recoge la info del cliente y se la da a la BBDD pasando a través del index.js

const { query } = require('express');
var Note = require('../models/note') //el modelo está en src/models/note.js

var controller = { //contiene todas las funciones disponibles
    //recoge la info del formulario y responde al cliente si está bien o no
    saveNote:(req, res)=>{ //request, response
        var params = req.body; //obtenemos los datos
        var note = new Note(); //Note es el nombre del esquema de la BBDD (que creo en model)
        note.author = params.author;
        note.title = params.title;
        note.note = params.note;

        //noteSaved es como una copia del objeto note que nosotros hemos creado, que el cliente recibe cuando se guarda (hace save)
        note.save((error, noteSaved) => { //save es la función de mongoose
            if(error || !noteSaved){ //si hay un error o no se ha guardado la nota...
                return res.status(404).send({
                    status: 'Error',
                    massage: 'No ha sido posible guardar la nota'
                })
            }
            return res.status(200).send({ //si todo ha ido bien respondemos al cliente con 200OK
                status: 'Success',
                message: 'Nota guardada con éxito',
                noteSaved
            })
        })
    }, //SEPARAR CON COMAS porque tenemos todas las funciones dentro de un objeto

    getNotes: (req, res) => {
        var queries = Note.find({}) //Note hace referencia a l.5
        queries.sort('-date').exec((error, notes) => {//obtener de más actuales a más antiguas
            if(error){ 
                return res.status(404).send({
                    status: 'Error',
                    massage: 'No ha sido posible obtener las notas'
                })
            }
            if(!notes){ 
                return res.status(400).send({
                    status: 'Error',
                    massage: 'No existen notas que mostrar'
                })
            } 
             return res.status(200).send({
                status: 'Success',
                notes
            })
        })
    },

    deleteNote: (req, res) =>{
        var id = req.params.id //obtenemos el id por la url (lo buscamos en los parámetros)
        //Después de recuperar el id se lo paso a la función indicando que tipo de parámetro es el que he recuperado
        Note.findOneAndDelete({_id:id}, (error, noteRemoved)=>{ //Note es el acceso que tenemos al modelo, findOneAndDelete es una función de mongoose
            if(error || !noteRemoved){
                return res.status(404).send({
                    status:'Error',
                    message: 'No ha sido posible eliminar la nota'
                })
            }
            return res.status(200).send({
                status:'success',
                message: 'Nota eliminada con éxito',
                noteRemoved
            })
        })
    }
}

module.exports = controller;
