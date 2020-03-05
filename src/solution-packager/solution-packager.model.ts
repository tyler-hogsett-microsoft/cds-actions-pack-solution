export type Action = 'extract' | 'pack';
export type PackageType = 'unmanaged' | 'managed' | 'both';

export interface Request {
  action: Action;
  zipFile: string;
  packageType: PackageType;
  folder: string;
}

export interface Result {}
