import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetHelp } from 'src/app/interface/getHelp.interface';
import { GetHelpService } from 'src/app/services/get-help/get-help.service';

@Component({
  selector: 'app-get-help-edit',
  templateUrl: './get-help-edit.component.html',
  styleUrls: ['./get-help-edit.component.scss']
})
export class GetHelpEditComponent implements OnInit {

  gethelp: GetHelp = new GetHelp();
  formGetHelp!: FormGroup;

  constructor(private service: GetHelpService, private router: Router, private route: ActivatedRoute, private fB: FormBuilder) {}

  ngOnInit(): void {
    this.gethelp.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.createForm();
  }

  createForm() {
    this.formGetHelp = this.fB.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      text: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  findById():void {
    this.service.findById(this.gethelp.id).subscribe(gethelp => {
      this.gethelp = gethelp;
      this.formGetHelp.patchValue(this.gethelp);
    });
  }

  update(): void {
    this.gethelp.title = this.formGetHelp.value.title;
    this.gethelp.text = this.formGetHelp.value.text;

    if(this.formGetHelp.valid) {
      this.service.update(this.gethelp).subscribe(() => {
        this.service.showMessage('Card Atualizada com Sucesso!', true);
        this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/getHelp`]);
      })
    } else {
      this.service.showMessage('Preencha todos os campos!', true);
    }
  }

  delete(): void {
    const confirmDelete = confirm('Tem certeza de que deseja excluir este Card?');
    if (confirmDelete) {
      this.service.delete(this.gethelp.id).subscribe(() => {
        this.service.showMessage('Obter Ajuda Excluído com Sucesso!', true);
        this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/getHelp`]);
      });
    }
  }
}
