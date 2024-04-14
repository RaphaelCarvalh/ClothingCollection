import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Company } from 'src/app/interface/company.interface';
import { User } from 'src/app/interface/user.interface';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit{

  user: User = new User();
  company: Company = new Company();
  listUsers: User[] = [];
  listCompanies: Company[] = [];
  logoCompany: any = this.company.logo;

  constructor(private router: Router, private service: UserService, private companyService: CompanyService, private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.company.id = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.getCompanyById();
      this.getCompanyDefaultTheme();
    })
  }

  logout() {
    localStorage.removeItem('logged');
    localStorage.removeItem('jwt');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userIdCompany');
    localStorage.removeItem('userType');
    this.service.showMessage('Logout realizado com sucesso!', true);
    this.router.navigate(['login']);
  }

  redirectPerfil(id: any) {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/perfil/${localStorage.getItem('userId')}`]);
  }

  redirectUser() {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/user`]);
  }

  navigateToSettings() {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/systemConfiguration/${localStorage.getItem('userIdCompany')}`]);
  }

  findAll() {
    this.service.findAll().subscribe((users) => {
      this.listUsers = users;
    })
  }

  getCompanyById() {
    this.companyService.findByIdAu(this.company.id).subscribe(company => {
      this.company.logo = company.logo;
    })
  }

  getCompanyDefaultTheme() {
    this.companyService.findByIdAu(this.company.id).subscribe(company => {
      this.company.defaultTheme = company.defaultTheme;
      this.company.lightModePrimary = company.lightModePrimary;
      this.company.darkModePrimary = company.darkModePrimary;
    })
  }
}
