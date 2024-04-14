import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetHelp } from 'src/app/interface/getHelp.interface';
import { GetHelpService } from 'src/app/services/get-help/get-help.service';

@Component({
  selector: 'app-get-help-create',
  templateUrl: './get-help-create.component.html',
  styleUrls: ['./get-help-create.component.scss']
})
export class GetHelpCreateComponent {
  gethelp: GetHelp = new GetHelp();
  formGetHelp!: FormGroup;

  constructor(private service: GetHelpService, private router: Router, private fB: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGetHelp = this.fB.group({
      title: ['', [Validators.required, Validators.minLength(20)]],
      text: ['', [Validators.required, Validators.minLength(30)]]
    });
  }

  create(): void {
    if(this.formGetHelp.valid) {
      this.service.create(this.formGetHelp.value).subscribe(() => {
        this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/getHelp`]);
        this.service.showMessage('Cadastro realizado com sucesso!', true);
      });
    } else {
      this.service.showMessage('Preencha todos os campos!', true);
    }
  }
}
