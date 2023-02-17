export type ResponseCode =
  | "url_not_found"
  | "server_error"
  | "ok"
  | "unauthenticated"
  | "authenticated"
  | "user_not_found"
  | "already_logged_in"
  | "invalid_req_body"
  | "invalid_credentials"
  | "jwt_error"
  | "created"
  | "duplicate_key"
  | "unauthorized";

export interface ResponseObject {
  status: "success" | "fail" | "error";
  code: ResponseCode;
  message: string;
  [key: string]: any;
}
