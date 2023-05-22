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

  students: User[];
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

  deleteUsuario(id: number) {
    if (confirm('Deseja mesmo excluir esse registro?')) {
      this.userService.deletarUsuario(id).subscribe(retorno => {
        console.log('Retorno do delete: ' + retorno);
        this.userService.getStudentList().subscribe(students => {
          this.students = students;
        });
      });
    }
  }

  consultarUsuarioPorNome() {
    this.userService.getUsuarioPorNome(this.nome).subscribe(retorno => {
      this.students = retorno;
    });
  }

  carregarPagina(pagina) {
    this.userService.getStudentListPage(pagina - 1).subscribe(retorno => {
      this.students = retorno.content;
      this.total = retorno.totalElements;
    });
  }
}
