import { spawn } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const spawnChildProcess = async (args) => {
 const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const scriptPath = join(currentDirectory, './files/script.js');
  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit', 'ipc'],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on('message', (msg) => {
    console.log(`child message: ${msg}`);
  });

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ['someArgument1', 'someArgument2']);
