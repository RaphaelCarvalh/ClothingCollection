import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { ModelService } from 'src/app/services/model/model.service';
import { UserService } from 'src/app/services/user/user.service';
import { delay, forkJoin } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Collection } from 'src/app/interface/clothingCollection.interface';
import { Model } from 'src/app/interface/modelClothing.interface';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent {

  public lineChartType: ChartType = 'line';
  public lineChartData: ChartDataset[] = [];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;

  listModels: Model[] = [];
  listCollections: Collection[] = [];
  listUsers: User[] = [];
  model: Model = new Model();
  user: User = new User();
  collection: Collection = new Collection();

  dataModelList = new MatTableDataSource<Model>(this.listModels);
  dataCollectionList = new MatTableDataSource<Collection>(this.listCollections);
  dataUserList = new MatTableDataSource<User>(this.listUsers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modelService: ModelService,
    private router: Router,
    private collectionService: CollectionService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.findAllUsers();
    this.findAllModels();
    this.findAllCollections();
    this.ngAfterViewInit();
    this.request();
  }

  findAllModels() {
    this.modelService.findAll().subscribe((models) => {
      setTimeout(() => {
        this.listModels = models;
        this.dataModelList = new MatTableDataSource<Model>(models);
        this.dataModelList.paginator = this.paginator;
        this.dataModelList.sort = this.sort;
      })
    })
  }

  findAllCollections() {
    this.collectionService.findAll().subscribe((collections) => {
      this.listCollections = collections;
    })
  }

  findAllUsers() {
    this.userService.findAll().subscribe((users) => {
      this.listUsers = users;
    })
  }

  ngAfterViewInit() {
    this.dataModelList.paginator = this.paginator;
    this.dataModelList.sort = this.sort;
  }

  redirect(id: any) {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/model/modelEdit/${id}`]);
  }

  bringCollectionName(id: number) {
    return this.listCollections.find((collection) => collection.id == id)?.name;
  }

  bringUserName(id: number) {
    return this.listUsers.find((user) => user.id == id)?.name;
  }

  request(): void {
    forkJoin([
      this.collectionService.getCollectionDataForChart(), this.modelService.getTotalCostByCollectionId()
    ])
    .pipe(
      delay(500)
    )
    .subscribe(([collectionData, totalCostData]) => { 

      const combinedData = {
        datasets: [
          ...collectionData.datasets,
          ...totalCostData.datasets,
        ],
        labels: [
          ...collectionData.labels,
        ]
      };
      this.lineChartData = combinedData.datasets;
      this.lineChartLabels = combinedData.labels;
    });
  }
}
