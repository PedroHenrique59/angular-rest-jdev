import {Telefone} from './telefone';
import {Profissao} from './profissao';

export class User {

  id?: number;
  login: string;
  nome: string;
  cpf: string;
  senha: string;
  dataNascimento: string;
  salario: number;
  profissao: Profissao = new Profissao();
  telefones: Array<Telefone>;
}
