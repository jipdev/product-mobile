import { Fabrication } from '../enums/fabrication';

export interface Product {
  id?: string;
  name: string;
  fabrication: Fabrication;
  size: number;
  price: number;
}
