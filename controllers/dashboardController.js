// controllers/dashboardController.js

export const getDashboardOverview = (req, res) => {
  console.log("✅ Dashboard overview requested.");

  res.status(200).json({
    welcomeMessage: "Welcome to the Heavenly Roofing Admin Dashboard!",
    contentSections: [
      { label: "🆕 Create Roofing Project", link: "add-project.html" },
      { label: "🗂️ Manage Projects", link: "edit-projects.html" },
      { label: "📅 Manage Appointments", link: "public-appointments.html" },
    ],
    systemTools: [
      { label: "📊 Roofing Analytics", link: "site-analytics.html" },
      { label: "📨 Customer Messages", link: "user-messages.html" },
      { label: "⚙️ Update Site Settings", link: "settings.html" },
    ],
  });
};