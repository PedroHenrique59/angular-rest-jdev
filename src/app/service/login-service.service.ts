import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../app-constants';
import {Router} from '@angular/router';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {
  }

  login(usuario) {
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {
        /*Retorno HTTP*/

        const token = (JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]);

        localStorage.setItem('token', token);

        this.router.navigate(['home']);

      },
      error => {
        console.error('Erro ao gerar o token de login');
        alert('Acesso Negado');
      });
  }

  recuperar(login) {

    const user = new User();
    user.login = login;

    return this.http.post(AppConstants.baseUrlPath + 'recuperar/', user).subscribe(data => {
        alert(JSON.parse(JSON.stringify(data)).error);
      },
      error => {
        console.error('Erro ao recuperar login');
        alert('Erro ao recuperar login!');
      });
  }

}
