import {Telefone} from './telefone';

export class User {

  id?: number;
  login: string;
  nome: string;
  cpf: string;
  senha: string;
  dataNascimento: string;
  telefones: Array<Telefone>;
}
