import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';

const decompress = async () => {
	const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const inputPath = join(currentDirectory, './files/archive.gz');
  const outputPath = join(currentDirectory, './files/fileToCompress.txt');

  try {
    await access(inputPath, constants.F_OK);

		const readableStream = createReadStream(inputPath);
    const gunzipStream = createGunzip();
    const writableStream = createWriteStream(outputPath);

    await pipeline(readableStream, gunzipStream, writableStream);

    console.log('✅ File successfully decompressed to fileToCompress.txt');
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await decompress();
