document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("changePasswordForm");
  const messageBox = document.getElementById("passwordChangeMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageBox.textContent = "";

    const currentPassword = form.currentPassword.value.trim();
    const newPassword = form.newPassword.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      messageBox.textContent = "⚠️ Please fill in all fields.";
      return;
    }

    if (newPassword !== confirmPassword) {
      messageBox.textContent = "❌ New passwords do not match.";
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        messageBox.textContent = `❌ ${data.error || "Failed to change password"}`;
        return;
      }

      messageBox.textContent = "✅ Password updated successfully.";
      form.reset();
    } catch (err) {
      console.error("Change Password Error:", err);
      messageBox.textContent = "❌ Server error. Please try again.";
    }
  });
});