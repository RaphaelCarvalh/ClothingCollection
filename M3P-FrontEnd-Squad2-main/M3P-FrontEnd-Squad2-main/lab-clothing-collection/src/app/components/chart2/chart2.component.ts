import { Component } from '@angular/core';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { ModelService } from 'src/app/services/model/model.service';
import { delay, forkJoin } from 'rxjs';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

const mesesDoAno = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})

export class Chart2Component {

  public lineChartType: ChartType = 'line';
  public lineChartData: ChartDataset[] = [];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;

  constructor(private modelService: ModelService, private collectionService: CollectionService,) { }

  ngOnInit(): void {
    this.request();
  }

  request(): void {
    forkJoin([
      this.collectionService.getCollectionDataForChart(),
      this.modelService.getTotalCostByCollectionId()
    ])
    .pipe(
      delay(500)
    )
    .subscribe(([collectionData, totalCostData]) => {

      this.lineChartLabels = mesesDoAno;

      const combinedData = {
        datasets: [
          ...collectionData.datasets,
          ...totalCostData.datasets,
        ],
      };
      this.lineChartData = combinedData.datasets;
    });
  }
}
