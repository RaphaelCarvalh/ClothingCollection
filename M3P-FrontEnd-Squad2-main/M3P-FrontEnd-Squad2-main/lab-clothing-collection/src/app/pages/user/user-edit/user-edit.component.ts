import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User = new User();
  formUserEdit!: FormGroup;
  listUsers: User[] = [];
  passwordPattern = '^[0-9]+$';

  ngOnInit(): void {
    this.user.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.getUsersList();
    this.createForm();
  }

  constructor(private router: Router, private service: UserService, private fB: FormBuilder, private route: ActivatedRoute) { }

  createForm() {
    this.formUserEdit = this.fB.group({
      name: [''],
      email: [''],
      userType: ['', [Validators.required]],
      userStatus: ['', [Validators.required]]
    });
  }

  getUsersList() {
    this.service.findAll().subscribe((users) => {
      this.listUsers = users;
      this.formUserEdit.patchValue(this.user);
    });
  }

  findById(): void {
    this.service.findById(this.user.id).subscribe(user => {
      this.user = user;
      this.formUserEdit.patchValue(this.user);
    });
  }

  update(): void {
    this.user.name = this.formUserEdit.value.name;
    this.user.email = this.formUserEdit.value.email;
    this.user.userType = this.formUserEdit.value.userType;
    this.user.userStatus = this.formUserEdit.value.userStatus;

    if(!this.formUserEdit.valid){
      this.service.showMessage('Preencha todas as informações', true);
    } else {
      this.service.updateType(this.user).subscribe(() => {
        this.service.showMessage('Usuário Atualizada com Sucesso!', true);
        this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/dashboard`]);
      })
    }
  }

  delete(): void {
    const confirmDelete = confirm('Tem certeza de que deseja excluir este usuário?');
    if (confirmDelete) {
      this.service.delete(this.user.id).subscribe(() => {
        this.service.showMessage('Usuário Excluído com Sucesso!', true);
        this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/dashboard`]);
      });
    }
  }
}
