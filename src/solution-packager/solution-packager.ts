import {Request, Result} from './solution-packager.model';

export async function run(request: Request): Promise<Result> {
  return new Promise<Result>((resolve, reject) => {
    try {
      validate();
      resolve({});
    } catch (error) {
      reject(error);
    }
  });

  function validate(): void {
    if (!request.zipFile.endsWith('.zip')) {
      throw new Error('zipFile must be a zip file');
    }
  }
}
