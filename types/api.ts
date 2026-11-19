// The shared API contract (see AGENTS.md): every backend reply has one of these shapes.

export type ApiMeta = {
  page: number;
  limit: number;
  total: number;
};

export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
  meta?: ApiMeta;
};

export type ApiError = {
  success: false;
  message: string;
  errors: { path: string; message: string }[];
};
