import net from 'node:net';
import fs from 'node:fs';
import fsPromise from 'node:fs/promises';

export const ping = (ip, callback) => {
  const startTime = process.hrtime();

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end();
    callback(undefined, { time: process.hrtime(startTime), ip });
  });

  client.on('error', (err) => {
    callback(err, undefined);
    client.end();
  });
};

// ping('plasenca.m', (err, info) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log(info);
// });


export async function obtenerDatosPromise() {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'datos importantes' });
    }, 2000);
  });
}

export function procesarArchivo() {
  fs.readFile('input.txt', 'utf8', (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message);
      return;
    }

    setTimeout(() => {
      const textoProcesado = contenido.toUpperCase();

      fs.writeFile('output.txt', textoProcesado, error => {
        if (error) {
          console.error('Error guardando archivo:', error.message);
          return;
        }

        console.log('Archivo procesado y guardado con éxito');
        return;
      });

    }, 1000);
  });
}

export async function processFile() {
  try {
    const fileContent = await fsPromise.readFile('input.txt', {
      encoding: 'utf-8',
    });

    setTimeout(async () => {
      const contentProcessed = fileContent.toUpperCase();

      await fsPromise.writeFile('output.txt', contentProcessed, {
        encoding: 'utf-8',
      });
    }, 1000);

    return true;
  } catch (error) {
    return false;
  }

}

export async function leerArchivos() {
  try {
    // const archivo1 = await fsPromise.readSync('archivo1.txt', 'utf8');
    // const archivo2 = await fsPromise.readSync('archivo2.txt', 'utf8');
    // const archivo3 = await fsPromise.readSync('archivo3.txt', 'utf8');

    const [archivo1, archivo2, archivo3] = Promise.all([fsPromise.readSync('archivo1.txt', 'utf8'),
    fsPromise.readSync('archivo2.txt', 'utf8'),
    fsPromise.readSync('archivo3.txt', 'utf8')
    ]);

    return `${archivo1} ${archivo2} ${archivo3}`;
  } catch (error) {
    return null;
  }
}

// leerArchivos();

export async function delay(n) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(); }, n);
  });
}

// delay(3000).then(() => console.log('Hola mundo'));
// o..
// await delay(3000);
// console.log('Hola mundo');

import { config } from './dotenv.js';

// config();

