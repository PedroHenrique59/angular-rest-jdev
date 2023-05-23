import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../../service/usuario-service.service';
import {Observable} from 'rxjs';
import {User} from '../../../model/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  students: Array<User>;
  nome: string;
  total: number;

  constructor(private userService: UsuarioService) {
  }

  ngOnInit() {
    this.userService.getStudentList().subscribe(retorno => {
      this.students = retorno.content;
      this.total = retorno.totalElements;
    });
  }

  deleteUsuario(id: number, index: number) {
    if (confirm('Deseja mesmo excluir esse registro?')) {
      this.userService.deletarUsuario(id).subscribe(retorno => {
        this.students.splice(index, 1);
      });
    }
  }

  consultarUsuarioPorNome() {
    if (this.nome === '') {
      this.userService.getStudentList().subscribe(retorno => {
        this.students = retorno.content;
        this.total = retorno.totalElements;
      });
    } else {
      this.userService.getUsuarioPorNome(this.nome).subscribe(retorno => {
        this.students = retorno.content;
        this.total = retorno.totalElements;
      });
    }
  }

  carregarPagina(pagina) {
    if (this.nome !== '') {
      this.userService.getUsuarioPorNomePage(this.nome, (pagina - 1)).subscribe(retorno => {
        this.students = retorno.content;
        this.total = retorno.totalElements;
      });
    } else {
      this.userService.getStudentListPage(pagina - 1).subscribe(retorno => {
        this.students = retorno.content;
        this.total = retorno.totalElements;
      });
    }
  }
}
