export interface IUserLogin{
  email: string,
  password: string,
  token: string
}

export class UserLogin implements IUserLogin {
  email!: string;
  password!: string;
  token!: string;
}
