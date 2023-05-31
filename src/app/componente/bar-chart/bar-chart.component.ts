import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {UsuarioService} from '../../service/usuario-service.service';
import {UsuarioChart} from '../../model/usuarioChart';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) {
  }

  usuarioChart: UsuarioChart = new UsuarioChart();

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    {data: [], label: 'Salário'}
  ];

  ngOnInit(): void {
    this.usuarioService.carregarGrafico().subscribe(retorno => {
      this.usuarioChart = retorno;

      this.barChartLabels = this.usuarioChart.nome.split(',');

      const arraySalario = JSON.parse('[' + this.usuarioChart.salario + ']');

      this.barChartData = [
        {data: arraySalario, label: 'Salário'}
      ];

    });
  }

}
