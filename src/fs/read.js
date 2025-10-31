import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const read = async () => {
 	const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const filePath = join(currentDirectory, './files/fileToRead.txt');

  try {
    await access(filePath, constants.F_OK);
    const content = await readFile(filePath, 'utf8');
    console.log(content);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await read();
