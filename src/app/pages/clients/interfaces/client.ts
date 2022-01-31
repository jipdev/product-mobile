import { Gender } from '../enums/gender';

export interface Client {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  gender: Gender;
}
