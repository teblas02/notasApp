const btn = document.getElementById('btn')

//Evento al hacer click al botón
btn.onclick = () => {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const note = document.getElementById('note').value;
    postData(author, title, note);
    document.getElementById('author').value = "";
    document.getElementById('title').value = "";
    document.getElementById('note').value = "";

}

async function postData(author, title, note){
    console.log(author)
    const response = await fetch('/api/save',{
        method: 'POST',
        headers: {
            //estas cabeceras siempre son así
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ //pasamos a texto el contenido que obtenemos del formulario (porque HTTP solo deja enviar texto)
            //entre '' el nombre de los argumentos como los hemos declarado en el controlador
            'author': author,
            'title': title,
            'note': note
        })
    })

    const data = await response.json(); //response en formato json
    console.log(data); //consola del navegador

}