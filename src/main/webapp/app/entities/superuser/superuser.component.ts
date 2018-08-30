import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISuperuser } from 'app/shared/model/superuser.model';
import { Principal } from 'app/core';
import { SuperuserService } from './superuser.service';

@Component({
    selector: 'jhi-superuser',
    templateUrl: './superuser.component.html'
})
export class SuperuserComponent implements OnInit, OnDestroy {
    superusers: ISuperuser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private superuserService: SuperuserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.superuserService.query().subscribe(
            (res: HttpResponse<ISuperuser[]>) => {
                this.superusers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSuperusers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISuperuser) {
        return item.id;
    }

    registerChangeInSuperusers() {
        this.eventSubscriber = this.eventManager.subscribe('superuserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
