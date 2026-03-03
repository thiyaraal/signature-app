export interface BaseResponse<T> {
  success: boolean;
  msg: string | null;
  result: T;
  pageRedirect: string | null;
  tokenValid: boolean;
}
