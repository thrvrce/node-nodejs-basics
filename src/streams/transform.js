import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const transform = async () => {
	try {
    const reverseStream = new Transform({
      transform(chunk, _encoding, callback) {
        const reversed = chunk.toString().split('').reverse().join('');
        callback(null, reversed);
      }
    });

    await pipeline(process.stdin, reverseStream, process.stdout);
  } catch {
    throw new Error('Stream operation failed');
  }
};

await transform();
