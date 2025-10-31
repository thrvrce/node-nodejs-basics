import { access, cp } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const copy = async () => {
	const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const srcDir = join(currentDirectory, './files');
  const destDir = join(currentDirectory, './files_copy');

  try {
    await access(srcDir, constants.F_OK);
	} catch (err) {
    throw new Error('FS operation failed');
  }
   
	try {
		await access(destDir, constants.F_OK);
		throw new Error('FS operation failed');
	} catch (err) {
		if (err.code !== 'ENOENT') throw new Error('FS operation failed');
	}

    await cp(srcDir, destDir, { recursive: true });
  
};

await copy();
