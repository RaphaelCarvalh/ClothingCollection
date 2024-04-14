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
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit{

  model: Model = new Model();
  user: User = new User();
  listModels: Model[] = [];
  listUser: User[] =[];
  collection: Collection = new Collection();
  listCollections: Collection[] = [];

  displayedColumns: string[] = ['id', 'name', 'idUser', 'idCCollection', 'cost'];
  dataSource = new MatTableDataSource<Model>(this.listModels);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ModelService, private router: Router, private collectionService: CollectionService, private userService: UserService) { }

  ngOnInit(): void {
    this.findAllUsers();
    this.findAllModels();
    this.findAllCollections();
    this.ngAfterViewInit();
  }

  findAllModels() {
    this.service.findAll().subscribe((models) => {
      setTimeout(() => {
        this.listModels = models;
        this.dataSource = new MatTableDataSource<Model>(models);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      this.listUser = users;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  redirect(id: any) {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/model/modelEdit/${id}`]);
  }

  bringCollectionName(id: number) {
    return this.listCollections.find((collection) => collection.id == id)?.name;
  }

  bringUserName(id: number) {
    return this.listUser.find((user) => user.id == id)?.name;
  }
}
