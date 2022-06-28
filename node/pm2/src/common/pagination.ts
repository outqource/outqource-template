type TPagination = {
  page: number;
  limit: number;
  offset: number;
  isPrev: boolean;
  count: number;
  isNext: boolean;
};

export const getPagination = (take: number, skip: number, count: number): TPagination => {
  const limit = Number(take);
  const page = (Number(skip) % Number(take)) + 1;
  const offset = Number(skip);
  const isPrev = Number(page) <= 0;
  const isNext = page * limit < count;

  return {
    count,
    isNext,
    isPrev,
    limit,
    offset,
    page,
  };
};
