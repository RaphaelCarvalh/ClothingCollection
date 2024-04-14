import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-redefine-password',
  templateUrl: './redefine-password.component.html',
  styleUrls: ['./redefine-password.component.scss']
})
export class RedefinePasswordComponent implements OnInit {

  formUserRedefine!: FormGroup;
  campsVazios = false;
  exibirAviso = false;
  user: User = new User();
  listUsers: User [] = [];

  ngOnInit(): void {
    this.createForm();
    this.getUsersList();
  }

  constructor(private router: Router, private userService: UserService) { }

  createForm() {
    this.formUserRedefine = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]),
    });
  }

  getUsersList() {
    this.userService.findAll().subscribe((users) => {
      this.listUsers = users;
    });
  }

  extractEmail() {
    let email = this.formUserRedefine.get('email')?.value;
    localStorage.setItem('email', email);
  }

  sendEmail(): void {
    let email = this.formUserRedefine.get('email')?.value;
    let dbEmail = this.listUsers.find((user) => user.email == email);
    console.log(dbEmail)

    if(!dbEmail){
      this.userService.showMessage('E-mail encontrado na base de dados!', true);
    } else {
      if(this.formUserRedefine.invalid) {
        this.campsVazios = true;
        this.exibirAviso = true;
        setTimeout(() => {
          this.exibirAviso = false;
        }, 3000);
        return;
      }
      this.extractEmail();
      this.router.navigate(['/sendingConfirmation']);
    }
  }
}
