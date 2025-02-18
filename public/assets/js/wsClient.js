// wsClient.js
const ws = new WebSocket("ws://localhost:3000");

const sessionId = `session_${Math.random().toString(36).substr(2, 9)}`;

ws.onopen = () => console.log("✅ WebSocket Connected");

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    displayMessage("bot", data.reply);
};

function sendMessage(chatInput, chatBox) {
    const message = chatInput.value.trim();
    if (message === "") return;

    displayMessage("user", message, chatBox);
    ws.send(JSON.stringify({ text: message, sessionId }));
    chatInput.value = "";
}

function displayMessage(sender, text, chatBox) {
    const msg = document.createElement("p");
    msg.innerHTML = `<b>${sender === "user" ? "You" : "AI"}:</b> ${text}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

export { ws, sendMessage, displayMessage };