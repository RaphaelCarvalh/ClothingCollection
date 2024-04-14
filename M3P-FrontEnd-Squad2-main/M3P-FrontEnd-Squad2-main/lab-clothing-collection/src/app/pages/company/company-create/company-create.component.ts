import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/interface/company.interface';
import { CompanyService } from 'src/app/services/company/company.service';

function validateCnpj(control: AbstractControl): { [key: string]: any } | null {
  const cnpj = control.value;
  if (cnpj) {
    const cleanedCnpj = cnpj.replace(/[^\d]+/g, '');
    if (cleanedCnpj.length !== 14 && cleanedCnpj.length !== 18) {
      return { invalidCnpj: true };
    }
    const hasSequence = cleanedCnpj.includes(cleanedCnpj.length === 14 ? '0001' : '0001', cleanedCnpj.length === 14 ? 8 : 11);
    if (!hasSequence) {
      return { invalidCnpj: true };
    }
    return null;
  }
  return null;
}

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})

export class CompanyCreateComponent implements OnInit {

  company: Company = new Company();
  formCompanyCreate!: FormGroup;
  dataSource!: Company;
  listCompanies: Company[] = [];
  isLoadingResults = false;
  camposVazios = false;
  exibirAviso = false;
  exibirAvisoCNPJ = false;

  ngOnInit() {
    this.formCompanyCreate = this.fB.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      cnpj: [null, [Validators.required, validateCnpj]],
      logo: [''],
      defaultTheme: ['Light'],
      lightModePrimary: [''],
      lightModeSecondary: [''],
      darkModePrimary: [''],
      darkModeSecondary: ['']
    })
  }

  constructor(private router: Router, private fB: FormBuilder, private service: CompanyService) { }

  getCompaniesList() {
    this.service.findAll().subscribe((companies) => {
      this.listCompanies = companies;
    });
  }

  create(): void {
    this.isLoadingResults = true;
    if (this.formCompanyCreate.invalid) {
      this.camposVazios = true;
      this.exibirAviso = true;
      this.exibirAvisoCNPJ = true;
      setTimeout(() => {
        this.exibirAviso = false;
      }, 3000);
      return;
    }
    this.service.create(this.formCompanyCreate.value).subscribe(() => {
      this.isLoadingResults = false;
      this.router.navigate(['companyCreate/companyManagerCreate']);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
