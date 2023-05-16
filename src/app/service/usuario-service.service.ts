import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../app-constants';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  getStudentList(): Observable<User[]> {
    return this.http.get<User[]>(AppConstants.baseUrl);
  }

  getUsuarioPorId(id: string): Observable<User> {
    return this.http.get<User>(AppConstants.baseUrl + id);
  }

  getUsuarioPorNome(nome: string): Observable<User[]> {
    return this.http.get<User[]>(AppConstants.baseUrl + 'usuarioPorNome/' + nome);
  }

  deletarUsuario(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, {responseType: 'text'});
  }

  salvar(usuario: User): Observable<User> {
    return this.http.post<User>(AppConstants.baseUrl, usuario);
  }

}
