// Import only setupNavigation from navigation.js
import { setupNavigation } from './navigation.js';
import { loadHeader, loadFooter } from './load-components.js';
import { initializeChatbot } from './chatbot.js'; // ✅ Import chatbot module

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    setupNavigation(); // ✅ Initialize navigation
    initializeChatbot(); // ✅ Initialize chatbot functionality
});