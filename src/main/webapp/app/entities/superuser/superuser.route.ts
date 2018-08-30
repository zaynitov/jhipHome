import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Superuser } from 'app/shared/model/superuser.model';
import { SuperuserService } from './superuser.service';
import { SuperuserComponent } from './superuser.component';
import { SuperuserDetailComponent } from './superuser-detail.component';
import { SuperuserUpdateComponent } from './superuser-update.component';
import { SuperuserDeletePopupComponent } from './superuser-delete-dialog.component';
import { ISuperuser } from 'app/shared/model/superuser.model';

@Injectable({ providedIn: 'root' })
export class SuperuserResolve implements Resolve<ISuperuser> {
    constructor(private service: SuperuserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((superuser: HttpResponse<Superuser>) => superuser.body));
        }
        return of(new Superuser());
    }
}

export const superuserRoute: Routes = [
    {
        path: 'superuser',
        component: SuperuserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superusers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'superuser/:id/view',
        component: SuperuserDetailComponent,
        resolve: {
            superuser: SuperuserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superusers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'superuser/new',
        component: SuperuserUpdateComponent,
        resolve: {
            superuser: SuperuserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superusers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'superuser/:id/edit',
        component: SuperuserUpdateComponent,
        resolve: {
            superuser: SuperuserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superusers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const superuserPopupRoute: Routes = [
    {
        path: 'superuser/:id/delete',
        component: SuperuserDeletePopupComponent,
        resolve: {
            superuser: SuperuserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superusers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
