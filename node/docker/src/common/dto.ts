import range from 'lodash/range';
import type { ControllerAPIResponsStatusCode, ValidatorItem, ValidationItemType } from 'outqource-node';
import { getPagination } from './pagination';

type EnumCheck<T> = T extends object ? T : 'string';

type ObjectValue<T> = T extends object
  ? T extends Date
    ? 'date' | 'date | null'
    : keyof object
  : T extends string
  ? EnumCheck<T>
  : T extends string | null
  ? 'string | null'
  : T extends number
  ? 'number'
  : T extends number | null
  ? 'number | null'
  : T extends boolean
  ? 'boolean'
  : T extends boolean | null
  ? 'boolean | null'
  : T extends string[]
  ? 'string[]'
  : T extends string[] | null
  ? 'string[] | null'
  : T extends number[]
  ? 'number[]'
  : T extends number[] | null
  ? 'number[] | null'
  : T extends Record<string, unknown>
  ? DTOToObject<T>
  : T extends Record<string, unknown> | null
  ? DTOToObject<T | null>
  : T extends Record<string, unknown>[]
  ? DTOToObject<T[0]>[]
  : never;

export type DTOToObject<T> = T extends Record<string, unknown>
  ? {
      [K in keyof Partial<T>]: ObjectValue<T[K]>;
    }
  : T extends null
  ?
      | {
          [K in keyof Partial<T>]: ObjectValue<T[K]>;
        }
      | null
  : never;

export type DTO<T> = T extends Record<string, unknown>
  ? {
      [K in keyof Partial<T>]: any;
    }
  : never;

export const paginationRequestDTO = (): ValidatorItem[] => {
  return [
    { key: 'page', type: 'number', default: 1, nullable: true },
    { key: 'limit', type: 'number', default: 20, nullable: true },
  ];
};

export const paginationDTO = {
  count: 'number',
  page: 'number',
  limit: 'number',
  offset: 'number',
  isPrev: 'boolean',
  isNext: 'boolean',
};

export const createPaginationRequestDTO = <T = any>(data: T, status?: ControllerAPIResponsStatusCode) => ({
  status: status || 200,
  example: { pagination: paginationDTO, rows: range(0, 3).map((index: number) => data) },
});

export const createRequestDTO = <T = any>(row: T, status?: ControllerAPIResponsStatusCode) => ({
  status: status || 200,
  example: { row },
});

export const createListResponse = <T = any>(rows: T, status?: ControllerAPIResponsStatusCode) => ({
  status: status || 200,
  example: { rows: [rows], pagination: paginationDTO },
});

export const createPaginationDTO = <T = any>(take: number, skip: number, count: number, rows: T[]) => ({
  pagination: getPagination(take, skip, count),
  rows,
});

export const timeDTO: DTOToObject<{ createdAt: Date; updatedAt: Date; deletedAt?: Date }> = {
  createdAt: 'date',
  updatedAt: 'date',
  deletedAt: 'date | null',
};

export const tokenDTO = (status: ControllerAPIResponsStatusCode) => {
  return {
    status,
    example: {
      accessToken: 'string',
      refreshToken: 'string',
    },
  };
};

export const emptyResponse = (status: ControllerAPIResponsStatusCode) => {
  return {
    status,
    example: {},
  };
};

export const responseWithId = (status: ControllerAPIResponsStatusCode) => {
  return {
    status,
    example: { id: 'string' },
  };
};
