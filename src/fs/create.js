import { access, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const create = async () => {
	const currentDirectory = dirname(fileURLToPath(import.meta.url));
 	const newFilePath = join(currentDirectory, './files/fresh.txt');
	 
	 try {
		 await access(newFilePath, constants.F_OK);
		 throw new Error('FS operation failed');
		} catch (err) {
			if (err.code === 'ENOENT') {
			const content = 'I am fresh and young';
      await writeFile(newFilePath, content, 'utf8');
    } else {
      throw new Error('FS operation failed');
    }
  }
};

await create();
