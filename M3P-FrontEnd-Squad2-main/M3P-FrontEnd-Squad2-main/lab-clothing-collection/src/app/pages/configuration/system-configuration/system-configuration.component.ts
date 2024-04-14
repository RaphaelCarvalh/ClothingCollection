import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/interface/company.interface';

@Component({
  selector: 'app-system-configuration',
  templateUrl: './system-configuration.component.html',
  styleUrls: ['./system-configuration.component.scss']
})
export class SystemConfigurationComponent implements OnInit {
  configForm!: FormGroup;
  backgroundColor: string = 'white'; // Cor de fundo padrão
  selectedColor = 'light';
  selectedTheme: string = 'default-theme';
  customColor: string = '';
  selectedImageUrl: string = '';
  company: Company = new Company();
  listCompanies: Company[] = [];


  constructor(private formBuilder: FormBuilder, private renderer: Renderer2, private el: ElementRef, private userService: UserService, private companyService: CompanyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.company.id = this.route.snapshot.paramMap.get('id');
    this.getCompanyById();
    this.createForm();
    this.getCompaniesList();
  }

  createForm() {
    this.configForm = this.formBuilder.group ({
      defaultTheme: [''],
      logo: ['', [Validators.required]],
      lightModePrimary: [''],
      lightModeSecondary: [''],
      darkModePrimary: [''],
      darkModeSecondary: ['']
  });
  }

  getCompaniesList() {
    this.companyService.findAll().subscribe((companies) => {
      this.listCompanies = companies;
    });
  }

  getCompanyById() {
    this.companyService.findByIdAu(this.company.id).subscribe(company => {
      this.company = company;
      this.configForm.patchValue(this.company);
    })
  }

  update(): void {
    this.company.defaultTheme = this.configForm.value.defaultTheme;
    this.company.logo = this.configForm.value.logo;
    this.company.lightModePrimary = this.configForm.value.lightModePrimary;
    this.company.lightModeSecondary = this.configForm.value.lightModeSecondary;
    this.company.darkModePrimary = this.configForm.value.darkModePrimary;
    this.company.darkModeSecondary = this.configForm.value.darkModeSecondary;

    if(!this.configForm.valid){
      this.companyService.showMessage('Preencha todas as informações', true);
    } else {
      this.companyService.update(this.company).subscribe(() => {
        this.companyService.showMessage('Configurações da Empresa Atualizadas com Sucesso!', true);
        this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/dashboard`]);
        window.location.reload();
      })
    }
  }

  return() {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/dashboard`]);
  }
}

