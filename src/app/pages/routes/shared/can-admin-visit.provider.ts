import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthorizationService } from './authorization.service';

import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class CanAdminVisitProvide implements CanActivate, CanLoad  {

    constructor(private AuthSrv: AuthorizationService, private msg: NzMessageService, ) {}

    check(): Observable<boolean> {
        return new Observable((observer) => {
            if (this.AuthSrv.hasRole('admin')) {
                observer.next(true);
                observer.complete();
                return;
            }
            this.msg.error('权限不足');
            observer.next(false);
            observer.complete();
           
        });
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.check();
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.check();
    }

}

