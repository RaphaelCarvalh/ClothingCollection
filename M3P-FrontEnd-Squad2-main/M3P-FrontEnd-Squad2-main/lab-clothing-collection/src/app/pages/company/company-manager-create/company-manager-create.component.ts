import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/interface/company.interface';
import { User } from 'src/app/interface/user.interface';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-company-manager-create',
  templateUrl: './company-manager-create.component.html',
  styleUrls: ['./company-manager-create.component.scss']
})
export class CompanyManagerCreateComponent implements OnInit {

  user: User = new User();
  company: Company = new Company();
  formManagerCreate!: FormGroup;
  listUsers: User[] = [];
  listCompanies: Company[] = [];
  dataSource!: User;
  isLoadingResults = false;
  idCmp = this.listCompanies.at(-1)?.id;
  nameCmp = this.listCompanies.at(-1)?.name;
  camposVazios = false;
  exibirAviso = false;

  ngOnInit() {
    this.createForm();
    this.getCompaniesList();
  }

  constructor(private router: Router, private service: UserService, private fB: FormBuilder, private serviceC: CompanyService) { }

  createForm(){
    this.formManagerCreate = this.fB.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.minLength(10), Validators.email]],
      idCompany: [null, [Validators.required]],
      userType: ['Gerente'],
      userStatus: ['Ativo'],
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: [null, [Validators.required, Validators.minLength(8)]],
    })
  }

  getUsersList() {
    this.service.findAll().subscribe((users) => {
      this.listUsers = users;
    });
  }

  getCompaniesList() {
    this.serviceC.findAll().subscribe((companies) => {
      this.listCompanies = companies;
      this.idCmp = this.listCompanies.at(-1)?.id;
      this.nameCmp = this.listCompanies.at(-1)?.name;
    })
  }

  create() {
    this.isLoadingResults = true
    const manager = this.formManagerCreate.value;
    if (!this.isSenhaComplexa(manager.password)) {
      this.isLoadingResults = false;
      this.service.showMessage('Senha não atende aos requisitos de segurança', false);
      return;
    }
    if (manager.password !== manager.passwordConfirmation) {
      this.isLoadingResults = false;
      this.service.showMessage('Senhas não conferem', false);
      return;
    }
    this.service.createManager(manager).subscribe(res => {
      const id = res['id'];
      this.isLoadingResults = false;
      this.service.showMessage('Cadastro realizado com sucesso!', true);
      this.router.navigate(['/login']);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  isSenhaComplexa(senha: string): boolean {
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,}$');
    return regex.test(senha);
  }
}
