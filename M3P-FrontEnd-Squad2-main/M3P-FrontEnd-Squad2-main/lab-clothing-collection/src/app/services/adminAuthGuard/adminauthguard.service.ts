import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    console.log('Verificando se o usuário está autenticado...');

    if (this.authService.logged()) {
      console.log('Usuário autenticado. Tentando obter a função do usuário...');

      const userRole = this.authService.getToken();

      console.log('Função do usuário encontrada:', userRole);

      if (userRole === 'Gerente' || userRole === 'Time' ) {
        console.log('Usuário é um administrador. Permitindo acesso.');
        return true;
      } else {
        console.log('Usuário não é um administrador. Redirecionando para a página inicial.');
        return false;
      }
    } else {
      console.log('Usuário não está autenticado. Redirecionando para a página inicial.');
    }

    this.router.navigate(['/wm/dashboard']);
    return false;
  }
}
