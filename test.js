import express from "express";
import crypto from "crypto-js";
import bodyParser from "body-parser";
import { exec } from "child_process";
import { ejecutarShell } from "./primera/segunda/testfun.js";

// Ruta del archivo shell a ejecutar

const app = express();
const PORT = 3000;
const GITHUB_WEBHOOK_SECRET = "11223344"; // Debes reemplazar esto con tu secreto compartido

// Llamada a la función asincrónica para ejecutar el script
async function ejecutarScript() {
  try {
    const resultado = await ejecutarShell();
    console.log(resultado);
  } catch (error) {
    console.error(error);
  }
}

app.use(bodyParser.json());

// Ruta para recibir el webhook
app.post("/github-webhook", async (req, res) => {
  const headers = req.headers;
  const body = req.body;

  console.log(req);
  // Verificamos el secreto compartido (opcional pero recomendado)
  const receivedSignature = headers["x-hub-signature"];

  const calculatedSignature = `sha1=${crypto
    .HmacSHA1(JSON.stringify(body), GITHUB_WEBHOOK_SECRET) // Se corrige el uso de HmacSHA1
    .toString(crypto.enc.Hex)}`;

  if (receivedSignature !== calculatedSignature) {
    console.log("Error: Signatures do not match.");
    return res.status(403).send("Unauthorized");
  }

  // Procesamos la notificación del webhook
  if (headers["x-github-event"] === "push" && body.ref.includes("main")) {
    console.log(body.ref.includes("main"));
    const repositoryName = body.repository.name;
    const pusherName = body.pusher.name;
    const commits = body.commits;

    console.log(`Se realizó un push en el repositorio ${repositoryName} por ${pusherName}`);
    console.log("Commits:");
    commits.forEach((commit) => {
      console.log(`- ${commit.message} por ${commit.author.name}`);
    });

    // Llamada a la función para ejecutar el script
    await ejecutarScript();
  }

  res.send("Webhook received successfully.");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
