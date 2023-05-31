import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../app-constants';
import {User} from '../model/user';
import {UsuarioReport} from '../model/usuarioReport';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  getStudentList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  getStudentListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
  }

  getUsuarioPorId(id: string): Observable<User> {
    return this.http.get<User>(AppConstants.baseUrl + id);
  }

  getUsuarioPorNome(nome: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'usuarioPorNome/' + nome);
  }

  getUsuarioPorNomePage(nome: string, pagina: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'usuarioPorNome/' + nome + '/page/' + pagina);
  }

  deletarUsuario(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, {responseType: 'text'});
  }

  salvar(usuario: User): Observable<User> {
    return this.http.post<User>(AppConstants.baseUrl, usuario);
  }

  atualizar(usuario: User): Observable<User> {
    return this.http.put<User>(AppConstants.baseUrl, usuario);
  }

  excluirTelefone(id: number): Observable<string> {
    return this.http.delete(AppConstants.baseUrl + 'excluirTelefone/' + id, {responseType: 'text'});
  }

  getProfissaoList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPath + 'profissao/');
  }

  downloadPdfRelatorio() {
    return this.http.get(AppConstants.baseUrl + 'relatorio', {responseType: 'text'}).subscribe(retorno => {
      document.querySelector('iframe').src = retorno;
    });
  }

  downloadPdfRelatorioParametros(usuarioReport: UsuarioReport) {
    return this.http.post(AppConstants.baseUrl + 'relatorio/', usuarioReport, {responseType: 'text'}).subscribe(retorno => {
      document.querySelector('iframe').src = retorno;
    });
  }

  carregarGrafico(): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'grafico');
  }


  usuarioAutenticado() {
    if (localStorage.getItem('token') != null && localStorage.getItem('token').toString().trim() != null) {
      return true;
    } else {
      return false;
    }
  }

}
