import jwtDecode from 'https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/build/jwt-decode.esm.js';

export function setupNavigation() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const token = localStorage.getItem("adminToken");
  let isAdmin = false;

  try {
    if (token) {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        console.warn("🔐 Token expired. Logging out.");
        localStorage.removeItem("adminToken"); } else {
        isAdmin = true;
      }
    }
  } catch (error) {
    console.error("JWT decode error:", error);
    localStorage.removeItem("adminToken");
  }

  // Public or Admin Navbar
  const navLinks = isAdmin
    ? `
      <li><a href="admin-dashboard.html">🧑‍💼 Dashboard</a></li>
      <li><a href="public-appointments.html">📋 Appointments</a></li>
      <li><a href="transactions.html">💰 Transactions</a></li>
      <li><a href="settings.html">⚙️ Settings</a></li>
      <li><a href="#" id="logout-link">🚪 Logout</a></li>
    `
    : `
      <li><a href="index.html">🏠 Home</a></li>
      <li><a href="about.html">🏡 About Us</a></li>
      <li><a href="supplementing.html">✅ Supplementing</a></li>
      <li><a href="services.html">🛠️ Services</a></li>
      <li><a href="chatbot.html">🤖 AI Chatbot</a></li>
      <li><a href="payment.html">💵 Make A Payment</a></li>
      <li><a href="contact.html">📬 Contact</a></li>
      <li><a href="login.html" id="login-link">🫅 Admin Login</a></li>
    `;

  // Set Navbar HTML
  navbar.innerHTML = `
    <div class="nav-left">
      <button class="hamburger-menu" id="menu-toggle" aria-label="Open navigation">
        ☰
      </button>
      <span class="nav-title">🏡 Heavenly Roofing</span>
    </div>
    <div class="menu-container">
      <div class="sidebar hidden" id="sidebar-menu">
        <div class="sidebar-header">
          <h2>📌 Menu</h2>
          <button class="close-menu" id="close-menu" aria-label="Close navigation">✖</button>
        </div>
        <ul class="nav-links">
          ${navLinks}
        </ul>
        <div class="cta-container">
          <a href="${isAdmin ? 'logout.html' : 'login.html'}" class="cta-button" id="cta-auth">
            ${isAdmin ? '🚪 Logout' : '🫅 Login'}
          </a>
        </div>
      </div>
      <div class="overlay hidden" id="menu-overlay"></div>
    </div>
  `;

  // Sidebar Events
  const menuButton = document.getElementById("menu-toggle");
  const sidebarMenu = document.getElementById("sidebar-menu");
  const closeButton = document.getElementById("close-menu");
  const overlay = document.getElementById("menu-overlay");

  const openMenu = () => {
    sidebarMenu.classList.add("visible");
    sidebarMenu.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.body.classList.add("no-scroll");
  };

  const closeMenu = () => {
    sidebarMenu.classList.remove("visible");
    sidebarMenu.classList.add("hidden");
    overlay.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  };

  menuButton?.addEventListener("click", openMenu);
  closeButton?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebarMenu.classList.contains("visible")) {
      closeMenu();
    }
  });

  // Active Link Highlight
  const currentPath = window.location.pathname.split("/").pop();
  sidebarMenu.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // Logout logic
  const logoutLink = document.getElementById("logout-link");
  const ctaAuth = document.getElementById("cta-auth");

  if (logoutLink || (ctaAuth && isAdmin)) {
    (logoutLink || ctaAuth).addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("adminToken");
      location.href = "login.html";
    });
  }
}
