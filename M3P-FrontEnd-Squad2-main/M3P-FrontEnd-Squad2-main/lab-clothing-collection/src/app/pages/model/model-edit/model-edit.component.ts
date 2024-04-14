import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection } from 'src/app/interface/clothingCollection.interface';
import { Model } from 'src/app/interface/modelClothing.interface';
import { User } from 'src/app/interface/user.interface';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { ModelService } from 'src/app/services/model/model.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-model-edit',
  templateUrl: './model-edit.component.html',
  styleUrls: ['./model-edit.component.scss']
})
export class ModelEditComponent implements OnInit {

  model: Model = new Model();
  user: User = new User();
  formModel!: FormGroup;
  collection: Collection = new Collection();
  listCollections: Collection[] = [];
  listModels: Model[] = [];
  colecoesFiltradas: Model[] = [];
  listUsers: User[] = [];

  constructor(private service: ModelService, private router: Router, private route: ActivatedRoute, private collectionService: CollectionService, private fB: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.model.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.createForm();
    this.findAllCollection();
    this.getUsersList();
  }

  createForm() {
    this.formModel = this.fB.group({
      name: ['', [Validators.required]],
      typeModel: ['', [Validators.required]],
      embroidered: ['', [Validators.required]],
      print: ['', [Validators.required]],
      idUser: ['', [Validators.required]],
      idCCollection: ['', [Validators.required]],
      cost: ['', [Validators.pattern(/^\d+(\.\d{1,6})?$/), Validators.min(0.01)]]
    });
    this.formModel.get('realCost')?.valueChanges.subscribe(value => { });
  }

  findById(): void {
    this.service.findById(this.model.id).subscribe(model => {
      this.model = model;
      this.formModel.patchValue(this.model);
    });
  }

  getUsersList() {
    this.userService.findAll().subscribe((users) => {
      this.listUsers = users;
    });
  }

  update(): void {
    this.model.name = this.formModel.value.name;
    this.model.typeModel = this.formModel.value.typeModel;
    this.model.embroidered = this.formModel.value.embroidered;
    this.model.print = this.formModel.value.print;
    this.model.idUser = this.formModel.value.idUser;
    this.model.idCCollection = this.formModel.value.idCCollection;
    this.model.cost = this.formModel.value.cost;

    if(!this.formModel.valid){
      this.service.showMessage('Preencha todas as informações', true);
    } else {
      this.service.update(this.model).subscribe(() => {
        this.service.showMessage('Modelo Atualizado com Sucesso!', true);
        this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/model`]);
      })
    }
  }

  delete(): void {
    const confirmDelete = confirm('Tem certeza de que deseja excluir este modelo?');
    if (confirmDelete) {
      this.service.delete(this.model.id).subscribe(() => {
        this.service.showMessage('Modelo Excluído com Sucesso!', true);
        this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/model`]);
      });
    }
  }

  findAllCollection() {
    this.collectionService.findAll().subscribe((collections) => {
      this.listCollections = collections;
    })
  }
  cancelar(): void {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/model`]);
  }
}
