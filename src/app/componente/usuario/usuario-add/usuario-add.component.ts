import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../model/user';
import {UsuarioService} from '../../../service/usuario-service.service';
import {Telefone} from '../../../model/telefone';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuarioModel: User;

  telefone: Telefone = new Telefone();

  constructor(private routeActive: ActivatedRoute, private usuarioService: UsuarioService) {
    this.usuarioModel = new User();
  }

  ngOnInit() {
    const id = this.routeActive.snapshot.paramMap.get('id');
    if (id != null) {
      this.usuarioService.getUsuarioPorId(id).subscribe(retorno => {
        this.usuarioModel = retorno;
      });
    }
  }

  addTelefone() {
    if (this.usuarioModel.telefones === undefined) {
      this.usuarioModel.telefones = new Array<Telefone>();
    }
    this.usuarioModel.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  printar() {
    alert('Valor do campo ' + this.telefone.numero);
  }

  excluirTelefone(id: number, index: any) {
    if (id === null) {
      this.usuarioModel.telefones.splice(index, 1);
      return;
    }

    if (id != null && confirm('Deseja remover?')) {
      this.usuarioService.excluirTelefone(id).subscribe(retorno => {
        this.usuarioModel.telefones.splice(index, 1);
        alert('Telefone excluído!');
      });
    }
  }

  limpar() {
    this.usuarioModel = new User();
    this.telefone = new Telefone();
  }

  salvar() {
    if (this.usuarioModel.id != null && this.usuarioModel.id.toString().trim() != null) {
      this.usuarioService.atualizar(this.usuarioModel).subscribe(retorno => {
        this.usuarioModel = retorno;
        alert('Usuario atualizado com sucesso!');
      });
    } else {
      this.usuarioService.salvar(this.usuarioModel).subscribe(retorno => {
        this.usuarioModel = retorno;
        alert('Usuario salvo com sucesso!');
      });
    }
  }
}
