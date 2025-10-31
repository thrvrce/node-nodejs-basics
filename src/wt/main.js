import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
  const numCPUs = cpus().length;
  const results = [];

  for (let i = 0; i < numCPUs; i++) {
    const n = 10 + i;
		const worker = new Worker(join(currentDirectory, './worker.js'), {
		  workerData: { n }
		});
    const promise = new Promise((resolve) => {
      worker.once('message', (message) => {
        if (message && message.error) {
          resolve({ status: 'error', data: null });
        } else {
          resolve({ status: 'resolved', data: message });
        }
      });

      worker.once('error', (err) => {
				console.log(err);
        resolve({ status: 'error', data: null });
      });
			
      worker.once('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });
    });

    results.push(promise);
  }

  const finalResults = await Promise.all(results);
  console.log(finalResults);
}

await performCalculations();
