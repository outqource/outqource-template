import type { person, manager } from '@prisma/client';

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
      }
    }
    interface Request {
      accessToken?: string;
      user: {
        userType: 'MANAGER' | 'USER' | 'DOCTOR' | 'PHARMACIST';
        id: number;
      };
      skip?: number;
      take?: number;
      file?: Multer.File | undefined;
      files?:
        | {
            [fieldname: string]: Multer.File[];
          }
        | Multer.File[]
        | undefined;
    }
  }
}
