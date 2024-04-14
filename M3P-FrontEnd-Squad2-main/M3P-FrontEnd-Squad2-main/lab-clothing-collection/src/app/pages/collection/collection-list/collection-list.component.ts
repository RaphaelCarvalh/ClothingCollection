import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Collection } from 'src/app/interface/clothingCollection.interface';
import { Model } from 'src/app/interface/modelClothing.interface';
import { User } from 'src/app/interface/user.interface';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { ModelService } from 'src/app/services/model/model.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  collection: Collection = new Collection();
  model: Model = new Model();
  user: User = new User();
  listCollections: Collection[] = [];
  listUser: User[] =[];
  listModels: Model[] = [];
  collectionModelQtd: any[] =[];

  displayedColumns: string[] = ['name', 'responsible', 'launchStation - releaseYearCollection', 'modelQuantity', 'budget'];
  dataSource = new MatTableDataSource<Collection>(this.listCollections);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: CollectionService, private modelService: ModelService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.findAllCollections();
    this.findAllModels();
    this.findAllUsers();
    this.ngAfterViewInit();
  }

  findAllCollections() {
    this.service.findAll().subscribe((collections) => {
      setTimeout(() => {
        this.listCollections = collections;
        this.dataSource = new MatTableDataSource<Collection>(collections);
        this.collectionModelQtd = this.getModelQuantity();
        this.dataSource = new MatTableDataSource<Collection>(this.collectionModelQtd);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100);
    })
  }

  findAllUsers() {
    this.userService.findAll().subscribe((users) => {
      this.listUser = users;
    })
  }

  findAllModels() {
    this.modelService.findAll().subscribe((models) => {
      this.listModels = models;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  redirect(id: any) {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/collection/collectionEdit/${id}`]);
  }

  getModelQuantity() {
    const returnValue: any[] = [];
    this.listCollections.forEach((collection, i) => {
      const modelByCollection = this.listModels.filter((model) => model.idCCollection === collection.id)
      const obj = {
        ...this.listCollections[i],
        modelQuantity: modelByCollection.length
      }
      returnValue.push(obj);
    })
    return returnValue;
  }

  bringUserName(id: number) {
    return this.listUser.find((user) => user.id === id)?.name;
  }
}
