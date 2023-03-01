const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()

    const name = document.getElementById('nombre').value
    const price = document.getElementById('precio').value
    const url = document.getElementById('foto').value

    const nuevoProducto = {
        name: name,
        price: price,
        url: url
    }

    socket.emit('nuevoProducto', nuevoProducto);

    /* const producto = {
         title: formAgregarProducto[0].value,
         price: formAgregarProducto[1].value,
         thumbnail: formAgregarProducto[2].value
     }
     socket.emit('update', producto);
     formAgregarProducto.reset()*/
})



socket.on('productos', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------

// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const author = new normalizr.schema.Entity('authors', {}, { idAttribute: "email" })

// Definimos un esquema de mensaje
const mensaje = new normalizr.schema.Entity('text', {
    author: author
})

// Definimos un esquema de posts
const schemaMensajes = new normalizr.schema.Entity('posts', {
    mensajes: [mensaje]
})

/* ----------------------------------------------------------------------------- */

const inputUsername = document.getElementById('username')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    /*const mensaje = {
         author: {
             email: inputUsername.value,
             nombre: document.getElementById('firstname').value,
             apellido: document.getElementById('lastname').value,
             edad: document.getElementById('age').value,
             alias: document.getElementById('alias').value,
             avatar: document.getElementById('avatar').value
             
         },
         text: inputMensaje.value*/
    const email = document.getElementById('inputUsername').value
    const message = document.getElementById('inputMensaje').value
    const firstName = document.getElementById('firstname').value
    const lastName = document.getElementById('lastname').value
    const age = document.getElementById('age').value
    const alias = document.getElementById('alias').value
    const avatar = document.getElementById('avatar').value

    const nuevoMensaje = {
        author: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            age: age,
            alias: alias,
            avatar: avatar
        },
        text: message
    }
    socket.emit('nuevoMensaje', nuevoMensaje),
    formPublicarMensaje.reset(),
    inputMensaje.focus()
    
})


socket.on('mensajes', mensajesN => {

    console.log(`Porcentaje de compresión ${porcentajeC}%`)
    document.getElementById('compresion-info').innerText = porcentajeC

    console.log(mensajesN.mensajes);
    const html = makeHtmlList(mensajesN.mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
        <div>
            <b style="color:blue;">${mensaje.author.email}</b>
            [<span style="color:brown;">${mensaje.fyh}</span>] :
            <i style="color:green;">${mensaje.text}</i>
            <img width="50" src="${mensaje.author.avatar}" alt=" ">
        </div>
    `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})