async function getData(){
    const response = await fetch('/api/getnotes'); //obtenemos los datos
    const data = await response.json(); //almacenamos los datos en formato json
    console.log(data); //lo muestra por la consola del navegador


    //con un bucle recorro todas las notas para crearlas
    for(let i=0; i<data.notes.length; i++){
        //PRIMERO. Columna
        const column = document.createElement('div'); //creo un elemento HTML a partir de JS
        column.className = 'col'; //le puedo dar nombre de calse, id, ....

        //SEGUNDO. Tarjeta
        const card = document.createElement('div');
        card.className = 'card mb-3' //con className se refiere a la clase de HTML para darle el estilo
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body'

        //TERCERO. Datos
        const title = document.createElement('h4');
        title.innerHTML = data.notes[i].title; //innerHTML -> modifica el contenido

        const note = document.createElement('p'); //p -> párrafo
        note.innerHTML = data.notes[i].note;

        const author = document.createElement('p'); //p -> párrafo
        author.innerHTML = data.notes[i].author;
        
        const date = document.createElement('p'); //p -> párrafo
        date.innerHTML = data.notes[i].date;

        //Insertar los elementos HTML en su correspondiente lugar
        cardBody.append(title); //el orden que indiquemos es en el que aparecerán
        cardBody.append(note);
        cardBody.append(author);
        cardBody.append(date);


        //Creamos delete button
        const button = document.createElement('button'); //document hace referencia al documento html con el que está asociado este js
        button.className = 'btn btn-danger' //danger es un botón en rojo. Esto está predefinido en bootstrap
        button.innerHTML = 'Eliminar'
        cardBody.append(button);
        card.append(cardBody);
        column.append(card);

        document.getElementById('portfolio').append(column);

        button.onclick = async() =>{ //asyncróno para poder utilizar await y que no nos salga una promise
            await fetch('/api/delete/' + data.notes[i]._id, {
                method: 'DELETE',
            }).then(res=> res.text().then(res=> console.log(res)));
            window.location.href = 'notes.html';
        }
    }
}

getData();