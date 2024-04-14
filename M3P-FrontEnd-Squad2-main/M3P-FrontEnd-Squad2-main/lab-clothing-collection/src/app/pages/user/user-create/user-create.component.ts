import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/interface/company.interface';
import { User } from 'src/app/interface/user.interface';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})

export class UserCreateComponent implements OnInit {
  formUserCreate!: FormGroup;
  passwordVisible = false;
  passwordPattern = '^[0-9]+$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  company: Company = new Company();
  user: User = new User();
  formModel!: FormGroup;
  listUsers: User[] = [];
  listCompanies: Company[] = [];
  isLoadingResults = false;
  idCmp = {id: localStorage.getItem('userIdCompany')};

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.createForm();
    this.getCompaniesList();
  }

  createForm() {
    this.formUserCreate = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.minLength(10), Validators.pattern(this.emailPattern)]],
      idCompany: [null, [Validators.required]],
      userType: [null, [Validators.required]],
      userStatus: ['Ativo'],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      passwordConfirmation: [null, [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]]
    });
  }

  getCompaniesList() {
    this.companyService.findAll().subscribe((companies) => {
      this.listCompanies = companies;
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  bringCompanyName(id: any) {
    return this.listCompanies.find((company) => company.id === id)?.name;
  }

  cancel() {
    this.router.navigate([`/wm/${localStorage.getItem('userIdCompany')}/user`]);
  }

  create() {
    let password = this.formUserCreate.get('password')?.value;
    let passwordConfirmation = this.formUserCreate.get('passwordConfirmation')?.value;
    this.isLoadingResults = true;

    if(password != passwordConfirmation){
      this.userService.showMessage('Senhas divergentes', true);
    } else {
      this.userService.create(this.formUserCreate.value).subscribe(res => {
        const id = res['id'];
        this.isLoadingResults = false;
        this.userService.showMessage('Cadastro realizado com sucesso!', true);
        this.router.navigate([`/wm/${localStorage.getItem('userIdCompany')}/user`]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
    }
  }
}
