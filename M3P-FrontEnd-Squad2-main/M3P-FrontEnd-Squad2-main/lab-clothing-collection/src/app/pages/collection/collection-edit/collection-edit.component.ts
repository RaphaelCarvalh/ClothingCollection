import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection } from 'src/app/interface/clothingCollection.interface';
import { User } from 'src/app/interface/user.interface';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-collection-edit',
  templateUrl: './collection-edit.component.html',
  styleUrls: ['./collection-edit.component.scss']
})
export class CollectionEditComponent implements OnInit {

  collection: Collection = new Collection();
  user: User = new User();
  formCollection!: FormGroup;
  listUsers: User[] = [];

  constructor(private service: CollectionService,
    private router: Router,
    private route: ActivatedRoute,
    private fB: FormBuilder,
    private serviceU: UserService) { }

  ngOnInit(): void {
    this.collection.id = this.route.snapshot.paramMap.get('id');
    this.user.id = this.route.snapshot.paramMap.get('idUser');
    this.findById();
    this.createForm();
    this.getUsersList();
  }

  createForm() {
    this.formCollection = this.fB.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      idUser: ['', [Validators.required]],
      launchStation: ['', [Validators.required]],
      releaseYearCollection: ['', [Validators.required, Validators.maxLength(4)]],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      budget: ['', [Validators.required, Validators.minLength(1)]],
      status: ['', [Validators.required]],
      collectionColors: ['', [Validators.required]]
    });
  }

  findById():void {
    this.service.findById(this.collection.id).subscribe(collection => {
      this.collection = collection;
      this.formCollection.patchValue(this.collection);
    });
  }

  getUsersList() {
    this.serviceU.findAll().subscribe((users) => {
      this.listUsers = users;
    });
  }

  onSubmit(): void {
    this.collection.name = this.formCollection.value.name;
    this.collection.idUser = this.formCollection.value.idUser;
    this.collection.launchStation = this.formCollection.value.launchStation;
    this.collection.status = this.formCollection.value.status;
    this.collection.releaseYearCollection = this.formCollection.value.releaseYearCollection;
    this.collection.brand = this.formCollection.value.brand;
    this.collection.budget = this.formCollection.value.budget;
    this.collection.collectionColors = this.formCollection.value.collectionColors;

    if(this.formCollection.valid) {
      this.service.update(this.collection).subscribe(() => {
        this.service.showMessage('Coleção Atualizada com Sucesso!', true);
        this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/collection`]);
      })
    } else {
      this.service.showMessage('Preencha todos os campos!', true);
    }
  }

  delete(): void {
    const confirmDelete = confirm('Tem certeza de que deseja excluir esta Coleção?');
    if (confirmDelete) {
      this.service.delete(this.collection.id).subscribe(() => {
        this.service.showMessage('Coleção Excluída com Sucesso!', true);
        this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/dashboard`]);
      });
    }
  }

  cancelar(): void {
    this.router.navigate([`/wm/${localStorage.getItem('userIdCompany')}/collection`]);
  }

  bringUserName(id: number) {
    return this.listUsers.find((user) => user.id === id)?.name;
  }
}
