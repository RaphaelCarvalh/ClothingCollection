import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../../services/perfil/perfil.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/interface/user.interface';
import { Company } from 'src/app/interface/company.interface';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {
  formUserEdit!: FormGroup;
  passwordVisible = false;
  passwordPattern = '^[0-9]+$';
  listUsers: User[] = [];
  listCompanies: Company[] = [];
  user: User = new User();
  company: Company = new Company();

  constructor(
    private fb: FormBuilder, private perfilService: PerfilService, private userService: UserService, private companyService: CompanyService,
    private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.getUsersList();
    this.getCompaniesList();
    this.formUserEdit = this.fb.group({
      password: [null, [Validators.minLength(8)]],
      passwordConfirmation: [null, [Validators.minLength(8)]]
    });
  }

  getUsersList() {
    this.userService.findAll().subscribe((users) => {
      this.listUsers = users;
      this.formUserEdit.patchValue(this.user);
    });
  }

  getCompaniesList() {
    this.companyService.findAll().subscribe((companies) => {
      this.listCompanies = companies;
    });
  }

  findById(): void {
    this.userService.findById(this.user.id).subscribe(user => {
      this.user = user;
      this.formUserEdit.patchValue(this.user);
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  update(): void {
    let password = this.formUserEdit.get('password')?.value;
    let passwordConfirmation = this.formUserEdit.get('passwordConfirmation')?.value;
    this.user.password = this.formUserEdit.value.password;

    if(password !== passwordConfirmation){
      this.perfilService.showMessage('Senhas divergentes, favor conferir.', true);
    } else {
      this.perfilService.updatePassword(this.user).subscribe(() => {
        this.perfilService.showMessage('Usuário Atualizada com Sucesso!', true);
        this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/dashboard`]);
      })
    }
  }

  cancelar() {
    this.formUserEdit.reset();
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/dashboard`]);
  }

  bringCompanyName(id: number) {
    return this.listCompanies.find((company) => company.id === id)?.name;
  }

  bringCompanyCnpj(id: number) {
    return this.listCompanies.find((company) => company.id === id)?.cnpj;
  }
}
