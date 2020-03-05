import 'mocha';
import chai, {expect} from 'chai';
import * as solutionPackager from './solution-packager';
import {Request} from './solution-packager.model';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('solution-packager', () => {
  describe('run', () => {
    describe('valid requests', () => {
      let validRequest: Request;
      beforeEach(() => {
        validRequest = {
          action: 'extract',
          folder: 'contents',
          packageType: 'both',
          zipFile: 'solution.zip'
        };
      });

      it('should return a successful result after running on a valid request', () => {
        const promise = solutionPackager.run(validRequest);
        expect(promise).to.eventually.exist;
      });
    });
    describe('invalid requests', () => {
      let invalidRequest: Request;
      beforeEach(() => {
        invalidRequest = {
          action: 'extract',
          folder: 'contents',
          packageType: 'both',
          zipFile: 'solution.rar'
        };
      });

      it('should returned a failed result after running on an invalid request', () => {
        const promise = solutionPackager.run(invalidRequest);

        expect(promise).to.eventually.be.rejected;
      });
    });
  });
});
