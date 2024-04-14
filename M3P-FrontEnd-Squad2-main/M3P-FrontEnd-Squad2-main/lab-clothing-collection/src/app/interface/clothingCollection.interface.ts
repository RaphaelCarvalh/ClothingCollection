export interface IClothingCollection{
  id?: any,
  name: string,
  brand: string,
  budget: number,
  collectionColors: string,
  releaseYearCollection: number,
  launchStation: string,
  status: string,
  idUser: any,
  modelQuantity: number,
  modelCost: number
}

export class Collection implements IClothingCollection {
  id?: any;
  name!: string;
  brand!: string;
  budget!: number;
  collectionColors!: string;
  releaseYearCollection!: number;
  launchStation!: string;
  status!: string;
  idUser!: any;
  modelQuantity!: number;
  modelCost!: number;
}
