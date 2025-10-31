import { access, rename as renameFile} from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rename = async () => {
	const currentDirectory = dirname(fileURLToPath(import.meta.url));
	const filesFolder = join(currentDirectory, './files');
	const oldFile = join(filesFolder, 'wrongFilename.txt');
  const newFile = join(filesFolder, 'properFilename.md');

  try {
    await access(oldFile, constants.F_OK);

		try {
      await access(newFile, constants.F_OK);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') throw new Error('FS operation failed');
    }

    await renameFile(oldFile, newFile);
  } catch {
    throw new Error('FS operation failed');
  }
};

await rename();
