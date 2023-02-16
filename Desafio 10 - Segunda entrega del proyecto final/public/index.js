const socket = io.connect();

function render(data) {
    const html = data
        .map((elem, index) => {
            return `<div style='text-align: center; background-color: lightblue'>
        <strong style='color: blue'>${elem.email}</strong>
        [<span style='color: brown'>${elem.time}</span>]:
        <i style='color: green'>${elem.text}</i>
        </div>`;
        })
        .join(" ");
    document.getElementById("messages").innerHTML = html;
}

socket.on("messages", data => {
    render(data);
});

function addMessage(e) {
    const message = {
        email: document.getElementById("email").value,
        text: document.getElementById("text").value,
    };
    if (!message.email) {
        alert(
            "Por favor, introduzca un email para mandar un mensaje en el chat"
        );
    } else {
        socket.emit("new-message", message);
        console.log('nuevo mensaje');

    }

    return false;
}

function addProduct(e) {
    console.log('se agrego el producto');
    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value,
    };
    if (!product.title) {
        alert("Por favor, introduzca el nombre del producto");
    } else if (!product.price) {
        alert("Por favor, introduzca el precio del producto");
    } else if (!product.thumbnail) {
        alert("Por favor, introduzca el link con la imagen del producto");
    } else {
        socket.emit("new-product", product);
    }

    return false;
}