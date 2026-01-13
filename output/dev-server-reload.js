(function() {
  const ws = new WebSocket(`ws://${location.host}`);

  // =========================
  // === HEARTBEAT CONFIG ===
  // =========================
  const HEARTBEAT_INTERVAL = 5000; // ms
  const HEARTBEAT_TIMEOUT  = 10000; // ms

  let heartbeatInterval = null;
  let lastPongTime = Date.now();
  let connectionLost = false;

  function startHeartbeat() {
    heartbeatInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "ping" }));
      }

      // Check timeout
      if (Date.now() - lastPongTime > HEARTBEAT_TIMEOUT) {
        handleConnectionLost();
      }
    }, HEARTBEAT_INTERVAL);
  }

  function stopHeartbeat() {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
  }

  function handleConnectionLost() {
    if (connectionLost) return;
    connectionLost = true;

    stopHeartbeat();

    popup.textContent =
      "Connexion au serveur de développement perdue.\n\n" +
      "Le serveur n'est plus accessible ou a été arrêté.\n" +
      "Veuillez recharger la page pour tenter de vous reconnecter.";
    popup.appendChild(closeBtn);
    popup.style.display = "block";

    badge.textContent = "Dev Server | Disconnected";
    badge.style.backgroundColor = "#dc3545";
    badge.style.color = "#fff";
  }

  // =========================
  // === BADGE CREATION ===
  // =========================
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
  badge.textContent = `Dev Server | Last reload: ${now.toLocaleTimeString()}`;
  document.body.appendChild(badge);

  // =========================
  // === POPUP CREATION ===
  // =========================
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

  popup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popup.style.display = "none";
  });

  // =========================
  // === WEBSOCKET EVENTS ===
  // =========================
  ws.addEventListener("open", () => {
    console.log("Connected to dev server for auto-refresh");
    lastPongTime = Date.now();
    startHeartbeat();
  });

  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);

    if (msg.type === "pong") {
      lastPongTime = Date.now();
      return;
    }

    if (msg.type === "stderr") {
      popup.textContent =
        "Parsing of the file failed! Detailed output below:\n\n" +
        msg.content;
      popup.appendChild(closeBtn);
      popup.style.display = "block";

      const t = new Date().toLocaleTimeString();
      badge.textContent = `Dev Server | Last reload: ${t}`;
    }
    else if (msg.type === "refresh") {
      badge.textContent = "Dev Server | Reload requested!";
      badge.style.backgroundColor = "#ffc107";
      badge.style.color = "#000";

      const currentHash = location.hash;
      location.reload();
      if (currentHash) {
        history.replaceState(null, null, currentHash);
      }
    }
  });

  ws.addEventListener("close", () => {
    console.log("WebSocket connection closed");
    handleConnectionLost();
  });

  ws.addEventListener("error", () => {
    handleConnectionLost();
  });

})();