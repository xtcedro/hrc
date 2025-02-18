// Import only setupNavigation from navigation.js
import { setupNavigation } from './navigation.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    setupNavigation(); // ✅ Initialize navigation
});