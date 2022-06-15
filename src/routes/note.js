//PASO 3
const express = require('express'); //framework que utiliza la aplicación y que usa HTTP

const Note = require('../controllers/note');

var router = express.Router(); //Router pertenece a express

//cuando el cliente le de a SaveNote se guardará en la ruta especificada. La ruta nos la inventamos nosotros
router.post('/save',  Note.saveNote); //utilizo POST para guardar datos através de la ruta /save
router.get('/getnotes', Note.getNotes);
router.delete('/delete/:id', Note.deleteNote); //con /:xx especifico los parámetros. Uno por cada parámetro
        //id es el nombre que le asigno en note(controler) al crear el método deleteNote

module.exports = router;