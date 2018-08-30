import { NgModule } from '@angular/core';

import { JhipSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhipSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhipSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipSharedCommonModule {}
