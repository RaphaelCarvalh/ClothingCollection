import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetHelp } from 'src/app/interface/getHelp.interface';
import { GetHelpService } from 'src/app/services/get-help/get-help.service';

@Component({
  selector: 'app-get-help-list',
  templateUrl: './get-help-list.component.html',
  styleUrls: ['./get-help-list.component.scss']
})
export class GetHelpListComponent  implements OnInit{

  getHelp: GetHelp = new GetHelp();
  listGetHelp: GetHelp[] = [];

  constructor(private service: GetHelpService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((gethelps) => {
      this.listGetHelp = gethelps;
    })
  }

  redirect(id: any) {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/getHelp/getHelpEdit/${id}`]);
  }
}
