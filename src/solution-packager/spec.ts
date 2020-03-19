import 'mocha';
import chai from 'chai';
import {Request} from './model';
import chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import {solutionPackagePath} from './constants';

chai.should();
chai.use(chaiAsPromised);
let sandbox: sinon.SinonSandbox;
beforeEach(() => {
  sandbox = sinon.createSandbox();
});
afterEach(() => {
  sinon.restore();
});

describe('solution-packager', () => {
  describe('run', () => {
    const request: Request = {
      action: 'extract',
      folder: 'foo',
      packageType: 'both',
      zipFile: 'bar'
    };
    let spawnFake: sinon.SinonSpy;
    let solutionPackager: {run: (request: Request) => Promise<void>};
    beforeEach(() => {
      spawnFake = sinon.fake();
      solutionPackager = proxyquire('./solution-packager', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        child_process: {
          spawn: spawnFake
        }
      });
    });
    it('should call spawn', async () => {
      await whenSolutionPackagerIsRun();
      spawnFake.calledOnceWith(solutionPackagePath).should.be.true;
    });

    async function whenSolutionPackagerIsRun(): Promise<void> {
      return solutionPackager.run(request);
    }
  });
});
