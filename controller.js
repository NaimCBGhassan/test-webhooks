import crypto from "crypto-js";
import { runScript } from "./utils.js";

export const githubWebhook = async ({ body, headers }, res) => {
  // Verificamos el secreto compartido (opcional pero recomendado)
  /*   const receivedSignature = headers["x-hub-signature"];
  const calculatedSignature = `sha1=${crypto.HmacSHA1(JSON.stringify(body), "11223344").toString(crypto.enc.Hex)}`;

  if (receivedSignature !== calculatedSignature) {
    console.log("Error: Signatures do not match.");
    return res.status(403).send("Unauthorized");
  }

  // Procesamos la notificación del webhook
  if (headers["x-github-event"] === "push" && body.ref.includes("test")) {
  } */
  await runScript(`./script.sh`); // Llamada a la función para ejecutar el script
  res.status(200).send("Webhook received successfully.");
};
