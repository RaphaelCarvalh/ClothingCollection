import { Component, ViewChild } from '@angular/core';
import { ModelService } from 'src/app/services/model/model.service';
import { Model } from 'src/app/interface/modelClothing.interface';
import { Collection } from 'src/app/interface/clothingCollection.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  model: Model = new Model();
  user: User = new User();
  collection: Collection = new Collection();
  listModels: Model[] = [];
  listUsers: User[] = [];
  listCollections: Collection[] = [];
  sortedValue: Collection[] = [];
  collectionModelQtd: any[] = [];

  displayedColumns: string[] = ['name', 'idUser', 'modelQuantity', 'budget', 'modelCost'];
  dataSource = new MatTableDataSource<Collection>(this.listCollections);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modelService: ModelService, private collectionService: CollectionService, private userService: UserService) {
    this.sortedValue = this.listCollections.slice();
  }

  ngOnInit(): void {
    this.ngAfterViewInit();
    this.findAllCollection();
    this.findAllModel();
    this.findAllUsers();
  }

  findAllCollection() {
    this.collectionService.findAll().subscribe((collections) => {
      setTimeout(() => {
        this.listCollections = collections;
        this.dataSource = new MatTableDataSource<Collection>(collections);
        this.averageBudget();
        this.collectionModelQtd = this.getModelQuantity();
        this.dataSource = new MatTableDataSource<Collection>(this.collectionModelQtd);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100);
    })
  }

  findAllUsers() {
    this.userService.findAll().subscribe((users) => {
      setTimeout(() => {
        this.listUsers = users;
      })
    })
  }

  findAllModel() {
    this.modelService.findAll().subscribe((models) => {
      setTimeout(() => {
        this.listModels = models;
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  averageBudget() {
    const sum = this.listCollections.reduce((acc, obj) => {
      return acc + obj.budget;
    }, 0)
    const lgt = this.listCollections.length;
    const total = sum / lgt;
    return total;
  }

  sortValue(sort: Sort) {
    const data = this.listCollections.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedValue = data;
      return;
    }

    this.sortedValue = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.budget, b.budget, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getModelQuantity() {
    const returnQtd: any[] = [];
    this.listCollections.forEach((collection, i) => {
      const modelByCollection = this.listModels.filter((model) => model.idCCollection === collection.id)
      const obj = {
        ...this.listCollections[i],
        modelQuantity: modelByCollection.length,
        modelCost: modelByCollection.reduce((total, cost) => total + cost.cost, 0)
      }
      returnQtd.push(obj);
    })
    return returnQtd;
  }

  bringUserName(id: number) {
    return this.listUsers.find((user) => user.id === id)?.name;
  }
}
