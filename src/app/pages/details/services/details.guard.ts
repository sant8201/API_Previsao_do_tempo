import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable()
export class DetailsGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    //Serificando se os parâmetros lat e lon existem, para entrar na página detail detail
    if (route.queryParams.lat && route.queryParams.lon) {
      return true;
    }
    //Se não tiver os parâmetros na url, retorna para a página home
    return this.router.createUrlTree(['']);
  }
}
