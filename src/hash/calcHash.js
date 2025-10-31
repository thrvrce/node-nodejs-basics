import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream';
import { once } from 'node:events';

const calculateHash = async () => {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const filePath = join(currentDirectory, './files/fileToCalculateHashFor.txt');

  try {
    await access(filePath, constants.F_OK);

    const fileStream = createReadStream(filePath);
    const hash = createHash('sha256');
    fileStream.pipe(hash);

		await once(hash, 'finish');

		const digest = hash.digest('hex');
    console.log(digest);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await calculateHash();
