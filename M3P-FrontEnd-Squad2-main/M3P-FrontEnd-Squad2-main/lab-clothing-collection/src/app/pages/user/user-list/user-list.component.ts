import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{

  user: User = new User();
  listUsers: User[] = [];

  displayedColumns: string[] = ['id', 'name', 'userType', 'email'];
  dataSource = new MatTableDataSource<User>(this.listUsers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
    this.ngAfterViewInit();
  }

  findAll() {
    this.service.findAll().subscribe((users) => {
      this.listUsers = users;
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  redirect(id: any) {
    this.router.navigate([`wm/${localStorage.getItem('userIdCompany')}/user/userEdit/${id}`]);
  }
}
