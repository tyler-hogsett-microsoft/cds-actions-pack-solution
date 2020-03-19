import {Request} from './model';
import {solutionPackagePath} from './constants';
import {injectable} from 'tsyringe';
import {Logger, Spawner} from './services';
import {ProcessError} from './errors';

@injectable()
export default class SolutionPackager {
  constructor(private logger: Logger, private spawner: Spawner) {}
  async run(request: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      const process = this.spawner.spawn(solutionPackagePath);
      process.stdout.on('data', data => {
        this.logger.log(data.toString());
      });
      process.stderr.on('data', data => {
        this.logger.error(data.toString());
      });
      process.on('exit', code => {
        if (code === 0) {
          resolve();
        } else {
          reject(new ProcessError(code as number));
        }
      });
    });
  }
}
