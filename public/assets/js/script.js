// Import only setupNavigation from navigation.js
import { setupNavigation } from './navigation.js';
import { loadHeader, loadFooter } from './load-components.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    setupNavigation(); // ✅ Initialize navigation
});