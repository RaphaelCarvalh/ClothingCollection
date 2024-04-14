export interface IModelClothing{
  id?: any,
  name: string,
  typeModel: string,
  embroidered: boolean,
  print: boolean,
  idUser: any,
  idCCollection: any,
  cost: number
}

export class Model implements IModelClothing {
  id?: any;
  name!: string;
  typeModel!: string;
  embroidered!: boolean;
  print!: boolean;
  idUser!: any;
  idCCollection!: any;
  cost!: number
}
