import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISuperuser } from 'app/shared/model/superuser.model';
import { SuperuserService } from './superuser.service';

@Component({
    selector: 'jhi-superuser-update',
    templateUrl: './superuser-update.component.html'
})
export class SuperuserUpdateComponent implements OnInit {
    private _superuser: ISuperuser;
    isSaving: boolean;

    constructor(private superuserService: SuperuserService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ superuser }) => {
            this.superuser = superuser;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.superuser.id !== undefined) {
            this.subscribeToSaveResponse(this.superuserService.update(this.superuser));
        } else {
            this.subscribeToSaveResponse(this.superuserService.create(this.superuser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISuperuser>>) {
        result.subscribe((res: HttpResponse<ISuperuser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get superuser() {
        return this._superuser;
    }

    set superuser(superuser: ISuperuser) {
        this._superuser = superuser;
    }
}
