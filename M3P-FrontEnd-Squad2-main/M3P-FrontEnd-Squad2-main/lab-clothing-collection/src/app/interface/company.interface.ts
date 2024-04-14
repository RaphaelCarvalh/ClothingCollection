export interface ICompany{
  id?: any,
  name: string,
  cnpj?: string,
  logo?: string,
  defaultTheme?: string,
  lightModePrimary?: string,
  lightModeSecondary?: string,
  darkModePrimary?: string,
  darkModeSecondary?: string
}

export class Company implements ICompany {
  id?: any;
  name!: string;
  cnpj?: string;
  logo?: string;
  defaultTheme?: string;
  lightModePrimary?: string;
  lightModeSecondary?: string;
  darkModePrimary?: string;
  darkModeSecondary?: string;
}
