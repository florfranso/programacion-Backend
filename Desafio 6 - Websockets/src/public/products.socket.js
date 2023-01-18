const socket = io();

const formProductos = document.getElementById("formProductos");
const inputNombre = document.getElementById("inputNombre");
const inputPrecio = document.getElementById("inputPrecio");
const inputFotoURL = document.getElementById("inputFotoURL");
const poolProductos = document.getElementById("poolProductos");

const sendProduct = (productInfo) => {
    socket.emit("client:product", productInfo);
};

const renderProduct = (productData) => {
    const htmlProductsPool = productData.map((productInfo) => {
        return (`<tr>
                        <th scope="row">${productInfo.id}</th>
                        <td>${productInfo.title}</td>
                        <td>${productInfo.price}</td>
                        <td><img src="${productInfo.thumbnail}" alt="" width="100"></td>
                </tr>`);
    });

    poolProductos.innerHTML = htmlProductsPool.join(" ")
};

const productSubmitHandler = (event) => {
    event.preventDefault();

    const productInfo = {
        title: inputNombre.value,
        price: inputPrecio.value,
        thumbnail: inputFotoURL.value
    };

    sendProduct(productInfo);

    inputNombre.value = "";
    inputPrecio.value = "";
    inputFotoURL.value = "";
};

formProductos.addEventListener("submit", productSubmitHandler);

socket.on("server:product", renderProduct);