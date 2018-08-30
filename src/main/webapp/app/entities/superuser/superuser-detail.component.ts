import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISuperuser } from 'app/shared/model/superuser.model';

@Component({
    selector: 'jhi-superuser-detail',
    templateUrl: './superuser-detail.component.html'
})
export class SuperuserDetailComponent implements OnInit {
    superuser: ISuperuser;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ superuser }) => {
            this.superuser = superuser;
        });
    }

    previousState() {
        window.history.back();
    }
}
