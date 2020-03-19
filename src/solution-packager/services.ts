import {
  SpawnOptionsWithoutStdio,
  ChildProcessWithoutNullStreams
} from 'child_process';

export interface Logger {
  log: (message: string) => void;
  error: (message: string) => void;
}

export interface Spawner {
  spawn: (
    path: string,
    options?: SpawnOptionsWithoutStdio
  ) => ChildProcessWithoutNullStreams;
}
