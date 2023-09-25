export interface LoginForm {
  email: string;
  password: string;
}

export interface EmailForm {
  email: string;
}

export interface VerificationForm {
  email: string;
  otpCode: number;
}

export interface ResetForm {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetFormApi {
  email: string;
  newPassword: string;
}
