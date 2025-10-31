import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const read = async () => {
	const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const filePath = join(currentDirectory, './files/fileToRead.txt');

  try {
    await access(filePath, constants.F_OK);
    const readableStream = createReadStream(filePath, 'utf8');
    await pipeline(readableStream, process.stdout);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await read();
