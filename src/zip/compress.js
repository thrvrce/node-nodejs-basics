import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

const compress = async () => {
	const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const inputPath = join(currentDirectory, './files/fileToCompress.txt');
  const outputPath = join(currentDirectory, './files/archive.gz');

  try {
    await access(inputPath, constants.F_OK);

		const readableStream = createReadStream(inputPath);
    const gzipStream = createGzip();
    const writableStream = createWriteStream(outputPath);

		await pipeline(readableStream, gzipStream, writableStream);

    console.log('✅ File successfully compressed to archive.gz');
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await compress();
