import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/interface/company.interface';
import { User } from 'src/app/interface/user.interface';
import { UserLogin } from 'src/app/interface/userLogin.interface';
import { CompanyService } from 'src/app/services/company/company.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  company: Company = new Company();
  idCompany: any;
  loginForm!: FormGroup;
  listUsers: User[] = [];
  listCompanies: Company[] = [];
  dataSource: UserLogin | undefined;
  isLoadingResults = false;
  campsVazios = false;
  exibirAviso = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern = '^[0-9]+$';

  ngOnInit() {
    this.getUsersList();
    this.loginForm = this.fB.group({
      email: [null, [Validators.required, Validators.minLength(10)]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  constructor(private router: Router, private service: LoginService, private serviceC: CompanyService, private fB: FormBuilder) { }

  getUsersList() {
    this.service.findAll().subscribe((users) => {
      this.listUsers = users;
    });
  }

  getCompanyList() {
    this.serviceC.findAll().subscribe((companies) => {
      this.listCompanies = companies;
    });
  }

  getCompanyById() {
    this.serviceC.findById(this.user.idCompany).subscribe((company) => {
      this.company.name = company.name;
    })
  }

  findUser(form: FormGroup) {
    this.listUsers.find((user) => {
      if(user.email === form.value.email) {
        this.user = user;
      }
    });
  }

  correctPassword(form: FormGroup, user: User) {
    if(user.password === form.value.userPassword) {
      return true;
    }
    return false;
  }

  createLocalStorage(booleanValue: boolean) {
    localStorage.setItem('logged', `${booleanValue}`);  }

  extract() {
    let userEmail = this.loginForm.get('email')?.value;
    const userId = this.user.id;
    const userIdCompany = this.user.idCompany;
    const userType = this.user.userType;
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userIdCompany', userIdCompany);
    localStorage.setItem('userType', userType);
  }

  onSubmit(form: NgForm) {
    this.isLoadingResults = true;
    if(!this.loginForm.valid) {
      this.campsVazios = true;
      this.exibirAviso = true;
      setTimeout(() => {
        this.exibirAviso = false;
      }, 3000);
      return;
    }
    this.findUser(this.loginForm);

    this.service.Login(form).subscribe(res => {
      this.dataSource = res;
      localStorage.setItem("jwt", this.dataSource.token);
      this.createLocalStorage(true);
      this.extract();
      this.isLoadingResults = false;
      this.service.showMessage('Login Realizado com Sucesso.')
      this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/dashboard`]);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
