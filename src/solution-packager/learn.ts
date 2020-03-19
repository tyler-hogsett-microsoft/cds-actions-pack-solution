import {spawn, SpawnOptions, SpawnOptionsWithoutStdio} from 'child_process';
import {solutionPackagePath} from './constants';
import 'mocha';
import chai, {expect} from 'chai';
import {ProcessError} from './errors';
import chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);

describe('SolutionPackager', () => {
  describe('trivial case', () => {
    it("throws an error complaining about missing '/action' and '/zipfile' arguments", async () => {
      try {
        await whenSolutionPackagerIsExecutedWithNoOptions();
      } catch (error) {
        expect(error).to.be.an.instanceOf(ProcessError);
        const processError = error as ProcessError;
        expect(processError.code).to.equal(2);
        expect(processError.message).to.contain(
          "Missing required argument '/action'"
        );
        expect(processError.message).to.contain(
          "Missing required argument '/zipfile'"
        );
      }
    });

    async function whenSolutionPackagerIsExecutedWithNoOptions(
      options?: SpawnOptionsWithoutStdio
    ): Promise<string> {
      return new Promise((resolve, reject) => {
        const output: string[] = [];
        const error: string[] = [];
        const process = spawn(solutionPackagePath, options);
        process.stdout.on('data', data => {
          output.push(data.toString());
        });
        process.stderr.on('data', data => {
          error.push(data.toString());
        });
        process.on('exit', code => {
          if (code === 0) {
            resolve(output.join(''));
          } else {
            reject(new ProcessError(code as number, error.join('')));
          }
        });
      });
    }
  });

  describe('happy path', () => {
    describe('pack', () => {
      it('creates a zip file', () => {});
    });
  });
});
