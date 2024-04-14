import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Collection } from 'src/app/interface/clothingCollection.interface';
import { Model } from 'src/app/interface/modelClothing.interface';
import { User } from 'src/app/interface/user.interface';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { ModelService } from 'src/app/services/model/model.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.scss']
})
export class ModelCreateComponent implements OnInit {

  model: Model = new Model();
  user: User = new User();
  formModel!: FormGroup;
  collection: Collection = new Collection();
  listCollections: Collection[] = [];
  listUsers: User[] = [];

  constructor(private service: ModelService, private router: Router, private collectionService: CollectionService, private fB: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.createForm();
    this.findAllCollection();
    this.getUsersList();
  }

  createForm() {
    this.formModel = this.fB.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      idUser: ['', [Validators.required]],
      typeModel: ['', [Validators.required]],
      idCCollection: ['', [Validators.required]],
      embroidered: [null, [Validators.required]],
      print: [null, [Validators.required]],
      cost: ['', [Validators.required]]
    });
  }

  create(): void {
    if(this.formModel.valid) {
      this.service.create(this.formModel.value).subscribe(() => {
        this.router.navigate([`/wm/${localStorage.getItem('userIdCompany')}/model`]);
        this.service.showMessage('Cadastro realizado com sucesso!', true);
      });
    } else {
      this.service.showMessage('Preencha todos os campos!', true);
    }
  }

  findAllCollection() {
    this.collectionService.findAll().subscribe((collections) => {
      this.listCollections = collections;
    })
  }

  getUsersList() {
    this.userService.findAll().subscribe((users) => {
      this.listUsers = users;
    });
  }
}
