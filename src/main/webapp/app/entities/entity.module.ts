import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipAuthorModule } from './author/author.module';
import { JhipSuperuserModule } from './superuser/superuser.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipAuthorModule,
        JhipSuperuserModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipEntityModule {}
