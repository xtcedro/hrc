// script.js
import { ws, sendMessage, displayMessage } from "./wsClient.js";

const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-chat");

sendButton.addEventListener("click", () => sendMessage(chatInput, chatBox));
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage(chatInput, chatBox);
});