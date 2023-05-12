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

  students: Observable<User[]>;

  constructor(private userService: UsuarioService) {
  }

  ngOnInit() {

    this.userService.getStudentList().subscribe(retorno => {
      this.students = retorno;
    });

  }

}
