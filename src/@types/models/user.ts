export interface ParamsLogin {
  user: UserLogin;
  navigate: any;
}

export interface UserLogin {
  email: string;
  password: string;
}
export interface UserEmail {
  email: string;
}

export interface UserVerification {
  email: string;
  otpCode: string;
}

export interface UserAuth {
  accountId: number;
  email: string;
  roleName: string;
}

export interface UserInfo {
  accountId: number;
  email: string;
  roleName: string;
}
