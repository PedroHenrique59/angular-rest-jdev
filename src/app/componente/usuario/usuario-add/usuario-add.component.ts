import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  constructor(private routeActive: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.routeActive.snapshot.paramMap.get('id');
    if (id != null) {
      console.log('Valor sendo editado: ' + id);
    }
  }

}
