export type APIResponse<T> = {
  success: boolean;
  data: T;
}

export type PaginatedData<Item> = {
  data: Item[];
  meta: {
    pagination: {
      page: number;
      pages: number;
      per_page: number;
      total: number;
    };
  };
};
