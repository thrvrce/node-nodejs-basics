import { access, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const list = async () => {
	const currentDirectory = dirname(fileURLToPath(import.meta.url));
 	const folderPath = join(currentDirectory, './files');

  try {
    await access(folderPath, constants.F_OK);
    const files = await readdir(folderPath);
    console.log(files);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await list();
