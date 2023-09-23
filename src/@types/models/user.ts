export interface ParamsLogin {
  user: UserLogin;
  navigate: any;
}

export interface UserLogin {
  email: string;
  password: string;
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
