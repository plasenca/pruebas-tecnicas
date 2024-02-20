import fsPromise from 'node:fs/promises';
import pathNode from 'node:path';

const readEnvFile = async (pathFile) => {
  try {
    const fileContent = await fsPromise.readFile(pathFile, { encoding: 'utf-8' });
    return fileContent;
  } catch (error) {
    throw Error(`There was an error reading file located in ${pathFile}`);
  }
};

const convertEnvContentToObject = (content) => {
  const listKeyValue = content.trim().split('\r\n');


  const envs = {};

  for (const keyValue of listKeyValue) {
    const [key, value] = keyValue.split('=');
    const valueFormatted = value.replaceAll('"', '');
    envs[key] = valueFormatted;
  }

  return envs;
};

export async function config(path = '.env') {

  try {
    const currentPath = process.cwd();
    const envPath = pathNode.join(currentPath, path);

    const envContent = await readEnvFile(envPath);
    const envObject = convertEnvContentToObject(envContent);

    for (const [key, value] of Object.entries(envObject)) {
      process.env[key] = value;
    }

  } catch (error) {

  }
}