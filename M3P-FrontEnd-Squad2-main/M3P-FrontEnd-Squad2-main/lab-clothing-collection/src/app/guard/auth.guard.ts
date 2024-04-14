import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private service: AuthService, private router: Router) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const returnLocalStorage =  localStorage.getItem('logged');
      const returnLogged = JSON.parse(returnLocalStorage!);

      if(!returnLogged) {
        this.router.navigate(['/login']);
        return returnLogged;
      }
      return returnLogged;
  }
}
