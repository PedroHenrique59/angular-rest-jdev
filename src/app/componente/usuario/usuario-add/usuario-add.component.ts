import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../model/user';
import {UsuarioService} from '../../../service/usuario-service.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuarioModel: User;

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

  limpar() {
    this.usuarioModel = new User();
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
