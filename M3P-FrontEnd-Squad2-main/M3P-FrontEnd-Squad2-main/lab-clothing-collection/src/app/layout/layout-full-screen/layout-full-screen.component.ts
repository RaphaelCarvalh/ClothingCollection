import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/interface/company.interface';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-layout-full-screen',
  templateUrl: './layout-full-screen.component.html',
  styleUrls: ['./layout-full-screen.component.scss']
})
export class LayoutFullScreenComponent implements OnInit {

  company: Company = new Company();
  listCompanies: Company[] = [];

  constructor(private router: Router, private companyService: CompanyService, private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/dashboard`]);
    this.company.id = this.route.snapshot.paramMap.get('id');
    this.getCompanyTheme();
  }

  getCompanyTheme() {
    this.companyService.findByIdAu(this.company.id).subscribe(company => {
      this.company.defaultTheme = company.defaultTheme;
      this.company.lightModePrimary = company.lightModePrimary;
      this.company.lightModeSecondary = company.lightModeSecondary;
      this.company.darkModePrimary = company.darkModePrimary;
      this.company.darkModeSecondary = company.darkModeSecondary;
    })
  }
}
