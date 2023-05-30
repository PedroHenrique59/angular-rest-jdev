import {Component, Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsuarioService} from '../../../service/usuario-service.service';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {UsuarioReport} from '../../../model/usuarioReport';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }
}

@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  format(date: NgbDateStruct | null): string {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

}

function validarDia(dia) {
  if (dia.toString() !== '' && parseInt(dia, 10) <= 9) {
    return '0' + dia;
  } else {
    return dia;
  }
}

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: FormataData}, {provide: NgbDateAdapter, useClass: FormatDateAdapter}]
})
export class UsuarioReportComponent {

  usuarioReport: UsuarioReport = new UsuarioReport();

  constructor(private routeActive: ActivatedRoute, private usuarioService: UsuarioService) {

  }

  imprimeRelatorio() {
    this.usuarioService.downloadPdfRelatorioParametros(this.usuarioReport);
  }

}
