import path from 'path';

export const workingDirectory = path.join(__dirname, '../..');
export const solutionPackagePath = path.join(
  workingDirectory,
  'core-tools/SolutionPackager.exe'
);
