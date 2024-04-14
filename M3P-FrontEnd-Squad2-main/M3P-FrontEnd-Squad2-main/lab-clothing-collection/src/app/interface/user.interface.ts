export interface IUser{
  id?: any,
  name: string,
  email: string,
  password?: string,
  passwordConfirmation: string,
  userStatus?: string,
  userType: string,
  idCompany: any,
  theme: string,
  logoUrl: string
}

export class User implements IUser {
  id?: any;
  name!: string;
  email!: string;
  password?: string;
  passwordConfirmation!: string;
  userStatus?: string;
  userType!: string;
  idCompany: any;
  theme!: string;
  logoUrl!: string;
}
