(function() {
  const ws = new WebSocket(`ws://${location.host}`);

  // --- Badge creation ---
  const badge = document.createElement("div");
  badge.style.position = "fixed";
  badge.style.top = "10px";
  badge.style.right = "10px";
  badge.style.padding = "5px 10px";
  badge.style.backgroundColor = "#28a745";
  badge.style.color = "#fff";
  badge.style.fontSize = "12px";
  badge.style.fontFamily = "Arial, sans-serif";
  badge.style.borderRadius = "5px";
  badge.style.zIndex = "9999";
  badge.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
  badge.style.cursor = "default";
  badge.style.transition = "all 0.3s ease";

  const now = new Date();
  const timeString = now.toLocaleTimeString();
  badge.textContent = `Dev Server | Last reload: ${timeString}`;
  document.body.appendChild(badge);

  // --- Pop-up creation (hidden by default) ---
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "20%";
  popup.style.left = "50%";
  popup.style.transform = "translateX(-50%)";
  popup.style.backgroundColor = "rgba(20, 20, 20, 0.95)";
  popup.style.color = "#ff5555";
  popup.style.padding = "20px";
  popup.style.borderRadius = "8px";
  popup.style.fontFamily = "monospace";
  popup.style.whiteSpace = "pre-wrap";
  popup.style.zIndex = "10000";
  popup.style.display = "none";
  popup.style.maxWidth = "80%";
  popup.style.maxHeight = "60%";
  popup.style.overflowY = "auto";
  popup.style.boxShadow = "0 0 15px rgba(0,0,0,0.7)";
  document.body.appendChild(popup);

  // --- Close button ---
  const closeBtn = document.createElement("span");
  closeBtn.textContent = "✖";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "10px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.color = "#ff5555";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.fontSize = "16px";
  popup.appendChild(closeBtn);

  // Close popup on click of either the popup itself or the close button
  popup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent triggering popup click
    popup.style.display = "none";
  });

  // --- WebSocket message handler ---
  ws.addEventListener("message", (event) => {
    try {
      const msg = JSON.parse(event.data);

      if (msg.type === "stderr") {
        // Show popup for errors
        popup.textContent = "Parsing of the file failed! Detailed output below:\n\n" + msg.content;
        popup.appendChild(closeBtn); // Re-add the close button since textContent clears children
        popup.style.display = "block";
      } else if (msg.type === "success") {
        // Hide popup if explicitly a success message
        popup.style.display = "none";
      }
      // If message type is unknown, do nothing (keep previous popup state)
    } catch {
      // fallback for old "refresh" messages
      if (event.data === "refresh") {
        badge.textContent = "Dev Server | Reload requested!";
        badge.style.backgroundColor = "#ffc107";
        badge.style.color = "#000";

        const currentHash = location.hash;
        location.reload();
        if (currentHash) {
          history.replaceState(null, null, currentHash);
        }
      }
    }
  });

  ws.addEventListener("open", () => {
    console.log("Connected to dev server for auto-refresh");
  });

  ws.addEventListener("close", () => {
    console.log("WebSocket connection closed");
  });

})();
