const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3000;
const GITHUB_WEBHOOK_SECRET = "11223344"; // Debes reemplazar esto con tu secreto compartido

app.use(bodyParser.json());

// Ruta para recibir el webhook
app.post("/github-webhook", (req, res) => {
  const headers = req.headers;
  const body = req.body;

  // Verificamos el secreto compartido (opcional pero recomendado)
  const receivedSignature = headers["x-hub-signature"];
  const calculatedSignature = `sha1=${crypto
    .createHmac("sha1", GITHUB_WEBHOOK_SECRET)
    .update(JSON.stringify(body))
    .digest("hex")}`;

  if (receivedSignature !== calculatedSignature) {
    console.log("Error: Signatures do not match.");
    return res.status(403).send("Unauthorized");
  }

  // Procesamos la notificación del webhook
  if (headers["x-github-event"] === "push") {
    const repositoryName = body.repository.name;
    const pusherName = body.pusher.name;
    const commits = body.commits;

    console.log(`Se realizó un push en el repositorio ${repositoryName} por ${pusherName}`);
    console.log("Commits:");
    commits.forEach((commit) => {
      console.log(`- ${commit.message} por ${commit.author.name}`);
    });

    // Aquí puedes realizar acciones adicionales con los datos recibidos, como desplegar el código, enviar notificaciones, etc.
  }

  res.send("Webhook received successfully.");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
