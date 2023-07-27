import { exec } from "child_process";

// Función para ejecutar el archivo shell
const runShell = (scriptPath) => {
  return new Promise((resolve, reject) => {
    exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error al ejecutar el script: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Error en el script: ${stderr}`);
        return;
      }
      resolve(`Salida del script: ${stdout}`);
    });
  });
};

// Llamada a la función asincrónica para ejecutar el script
export async function runScript(scriptPath) {
  try {
    await runShell(scriptPath);
  } catch (error) {
    console.error(error);
  }
}
