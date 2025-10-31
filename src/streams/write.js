import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const write = async () => {
	const currentDirectory = dirname(fileURLToPath(import.meta.url));
	const filePath = join(currentDirectory, './files/fileToWrite.txt');

  try {
    const writableStream = createWriteStream(filePath, { flags: 'w' });
    await pipeline(process.stdin, writableStream);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await write();
