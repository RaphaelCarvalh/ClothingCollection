import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollectionService } from '../../../services/collection/collection.service';
import { Collection } from 'src/app/interface/clothingCollection.interface';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-collection-create',
  templateUrl: './collection-create.component.html',
  styleUrls: ['./collection-create.component.scss']
})
export class CollectionCreateComponent implements OnInit {

  collection: Collection = new Collection();
  user: User = new User();
  formCollection!: FormGroup;
  listCollections: Collection[] = [];
  listUsers: User[] = [];
  isLoadingResults = false;

  constructor(private service: CollectionService, private router: Router, private fB: FormBuilder, private serviceU: UserService) {}

  ngOnInit(): void {
    this.getUsersList();
    this.createForm();
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

  getUsersList() {
    this.serviceU.findAll().subscribe((users) => {
      this.listUsers = users;
    });
  }

  create(): void {
    this.isLoadingResults = true;
    if(this.formCollection.valid) {
      this.service.create(this.formCollection.value).subscribe(() => {
        this.isLoadingResults = false;
        this.router.navigate([`/wm/${localStorage.getItem('userIdCompany')}/collection`]);
        this.service.showMessage('Cadastro realizado com sucesso!', true);
      });
    } else {
      this.service.showMessage('Preencha todos os campos!', true);
    }
  }

  bringUserName(id: number) {
    return this.listUsers.find((user) => user.id === id)?.name;
  }
}
