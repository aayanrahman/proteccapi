#!/usr/bin/env node
import { Command } from 'commander';
import { APIScanner } from '../src/index.js';

const program = new Command();

program
  .name('secure-scan')
  .description('Scan for exposed API keys and manage .env files')
  .version('1.0.0')
  .option('-a, --all', 'Scan all files (not just staged ones)')
  .option('-e, --env', 'Create/update .env file with found keys')
  .option('-d, --debug', 'Enable debug logging')
  .option('--env-path <path>', 'Custom path for .env file', '.env')
  .parse(process.argv);

const options = program.opts();

const scanner = new APIScanner({
  scanAllFiles: options.all,
  createEnvFile: options.env,
  debug: options.debug,
  envPath: options.envPath
});

scanner.scan().catch(error => {
  console.error('Scan failed:', error);
  process.exit(1);
});
