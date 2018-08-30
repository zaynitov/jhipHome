import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipSharedModule } from 'app/shared';
import {
    SuperuserComponent,
    SuperuserDetailComponent,
    SuperuserUpdateComponent,
    SuperuserDeletePopupComponent,
    SuperuserDeleteDialogComponent,
    superuserRoute,
    superuserPopupRoute
} from './';

const ENTITY_STATES = [...superuserRoute, ...superuserPopupRoute];

@NgModule({
    imports: [JhipSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SuperuserComponent,
        SuperuserDetailComponent,
        SuperuserUpdateComponent,
        SuperuserDeleteDialogComponent,
        SuperuserDeletePopupComponent
    ],
    entryComponents: [SuperuserComponent, SuperuserUpdateComponent, SuperuserDeleteDialogComponent, SuperuserDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipSuperuserModule {}
