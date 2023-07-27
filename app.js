import express from "express";
import bodyParser from "body-parser";
import { githubWebhook } from "./controller.js";
import morgan from "morgan";
import cors from "cors";

// Ruta del archivo shell a ejecutar

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());

// Ruta para recibir el webhook
app.post("/github-webhook", githubWebhook);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
