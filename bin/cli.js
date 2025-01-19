import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { Command } from 'commander';

const program = new Command();

program
  .command('secure-check')
  .description('Run advanced npm security checks')
  .action(() => {
    console.log(chalk.bold.cyan('\nSecure Check Subcommand Triggered'));


    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const dependencies = packageJson.dependencies || {};
      const devDependencies = packageJson.devDependencies || {};

      const maliciousPackageName = 'malicious-package-name';
      if (dependencies[maliciousPackageName] || devDependencies[maliciousPackageName]) {
        console.log(chalk.red(`Warning: Malicious package "${maliciousPackageName}" found in dependencies!`));
        process.exit(1);
      } else {
        console.log(chalk.green('No malicious packages found.'));
      }
    } else {
      console.log(chalk.yellow('No package.json file found.'));
    }
  });

program.parse(process.argv);