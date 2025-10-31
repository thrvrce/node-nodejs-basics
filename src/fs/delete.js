import { access, unlink } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const remove = async () => {
	const currentDirectory = dirname(fileURLToPath(import.meta.url));

  const filePath = join(currentDirectory, './files/fileToRemove.txt');

  try {
    await access(filePath, constants.F_OK);
    await unlink(filePath);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await remove();
