import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate { //Route Guard for secondary modules including AuthModule(login path)

    constructor(private httpService: HttpService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {

        return this.httpService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                const path = route.routeConfig.path;
                console.log(path)
                if (path === 'login') {  // can move login guard to another file
                    if (!isAuth) {
                        return true;
                    }
                    return this.router.createUrlTree(['/articles']);
                } else if (path === 'edit/:id') { //can move edit path guard to another file
                    if (isAuth) {
                        const id = +route.params['id'];
                        if (this.httpService.checkEditPermissionGuard(id)) {
                            return true;
                        }
                    }
                } else {
                    if (isAuth) {
                        return true;
                    }
                }
                return this.router.createUrlTree(['/login']);
            })
        );
    }
}
