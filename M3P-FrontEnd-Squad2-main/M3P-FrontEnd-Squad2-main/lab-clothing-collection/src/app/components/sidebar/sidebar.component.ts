import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/interface/company.interface';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  company: Company = new Company();
  listCompanies: Company[] = [];

  constructor(private router: Router, private companyService: CompanyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.company.id = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.getCompanyById();
      this.getCompanyDefaultTheme();
    })
  }

  redirect() {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/dashboard`]);
  }

  getCompanyDefaultTheme() {
    this.companyService.findByIdAu(this.company.id).subscribe(company => {
      this.company.defaultTheme = company.defaultTheme;
      this.company.lightModeSecondary = company.lightModeSecondary;
      this.company.darkModeSecondary = company.darkModeSecondary;
    })
  }

  getCompanyById() {
    this.companyService.findByIdAu(this.company.id).subscribe(company => {
      this.company.logo = company.logo;
    })
  }
}
