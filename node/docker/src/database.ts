import { PrismaClient } from '@prisma/client';
import config from 'config';

const SOFT_DELETE_MODELS = config.SOFT_DELETE_MODELS.split(',');

export class Database {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();

    this.softDeleteInterceptors().then();
    this.loggingInterceptors().then();
  }

  async softDeleteInterceptors() {
    this.prisma.$use(async (params: any, next: any) => {
      SOFT_DELETE_MODELS.forEach((model: string) => {
        if (params.model === model) {
          if (params.action === 'delete') {
            params.action = 'update';
            params.args['data'] = { deletedAt: new Date() };
          }
          if (params.action === 'deleteMany') {
            params.action = 'updateMany';
            if (params.args.data != undefined) {
              params.args.data = { deletedAt: new Date() };
            } else {
              params.args['data'] = { deletedAt: new Date() };
            }
          }
        }
      });

      return next(params);
    });
  }

  async loggingInterceptors() {
    this.prisma.$use(async (params: any, next: any) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();

      console.log(`${new Date().toDateString()} | Query ${params.model}.${params.action} took ${after - before}ms`);
      return result;
    });
  }
}

const database = new Database();

export default database.prisma;
export { database };
