const formMessages = document.getElementById("formMessages");
const inputUsername = document.getElementById("inputUsername");
const inputMessage = document.getElementById("inputMessage");
const poolMessages = document.getElementById("poolMessages");

const sendMessage = (messageInfo) => {
    socket.emit("client:message", messageInfo);
};

const messageSubmitHandler = (event) => {
    event.preventDefault();

    const messageInfo = {
        username: inputUsername.value,
        message: inputMessage.value,
        date: new Date().toLocaleString()
    };

    sendMessage(messageInfo);

    inputMessage.value = "";
    inputUsername.readOnly = true;
};

const renderMessage = (messagesData) => {
    const htmlMessagesPool = messagesData.map((messageInfo) => {
        return `<div> <strong style="color: blue">${messageInfo.username}</strong> <span style="color: brown">[${messageInfo.date}]:</span> <em style="color: green">${messageInfo.message}</em> </div>`;
    });

    poolMessages.innerHTML = htmlMessagesPool.join(" ");
};

formMessages.addEventListener("submit", messageSubmitHandler);

socket.on("server:message", renderMessage);