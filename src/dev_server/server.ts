import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import chokidar from "chokidar";
import { exec } from "child_process";
import path from "path";

const app: any = express();
const port = 3000;

// Désactiver tous les headers CORS
app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Servir tous les fichiers du dossier 'output' de façon récursive
app.use(express.static(path.join(process.cwd(), "output")));

// Page de test
app.get("/", (req: any, res: any) => {
  res.sendFile(path.join(process.cwd(), "output/index.html"));
});

const server = createServer(app);

// WebSocket pour notifier le client
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: any) => {
  console.log("Client connecté pour auto-refresh");
});

wss.on("message", (message: any) => {
  sendToClients("pong", message);
});

// Fonction pour notifier tous les clients d'un type de message
function sendToClients(type: string, content: any) {
  const message = JSON.stringify({ type, content });
  wss.clients?.forEach((ws: any) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(message);
    }
  });
}

// Fonction spécifique pour notifier un refresh
function notifyRefresh() {
  sendToClients("refresh", null);
}

// Surveiller le fichier demo.sml
const watchFiles = [
  path.join(process.cwd(), "input"),
  path.join(process.cwd(), "src/language-server/slide-ml.langium")
];

function onFilesChangedCallback() {
  // Lancer la commande
  exec("npm run generate && npm start -- --dev-mode", (error, stdout, stderr) => {
    let noErrorsOccured = !error && !stderr;
    if (error) {
      console.error(`Erreur : ${error.message}`);
      // Envoyer aussi l'erreur au front
      sendToClients("stderr", `Erreur : ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr : ${stderr}`);
      // Envoyer le stderr au front
      sendToClients("stderr", stderr);
      return;
    }

    if(noErrorsOccured) {
      sendToClients("success", "Generation succeeded without errors.");
    }

    console.log("Commande exécutée, mise à jour du dossier output terminée.");

    // Notifier le navigateur pour refresh
    notifyRefresh();
  });
}

chokidar.watch(watchFiles).on("change", () => {
  console.log("demo.sml changé, exécution de la commande...");

  onFilesChangedCallback();
});


onFilesChangedCallback(); //run at least once
server.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
