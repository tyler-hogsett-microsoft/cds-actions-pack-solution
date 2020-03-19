export class ProcessError extends Error {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(public code: number) {
    super(`SolutionPackager exited with error code ${code}`);
  }
}
