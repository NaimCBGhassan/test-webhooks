import { exec } from "child_process";

const scriptPath = "../../script.sh";

export const fun = () => {
  const ejecutarShell = () => {
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
};
