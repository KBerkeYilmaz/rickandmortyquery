export interface EmailSuccessResponse {
  message: string;
}

export interface EmailErrorResponse {
  error: boolean;
  message: string;
}

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export interface EmailRequestData {
  email: string;
  name: string;
  message: string;
}

