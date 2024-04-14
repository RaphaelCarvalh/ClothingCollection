import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sending-confirmation',
  templateUrl: './sending-confirmation.component.html',
  styleUrls: ['./sending-confirmation.component.scss']
})
export class SendingConfirmationComponent implements OnInit {

  email!: any;

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
  }

  constructor(private router: Router) { }

  backLogin(): void {
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
