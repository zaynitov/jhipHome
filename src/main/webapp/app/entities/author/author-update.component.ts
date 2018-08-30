import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from './author.service';

@Component({
    selector: 'jhi-author-update',
    templateUrl: './author-update.component.html'
})
export class AuthorUpdateComponent implements OnInit {
    private _author: IAuthor;
    isSaving: boolean;

    constructor(private authorService: AuthorService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ author }) => {
            this.author = author;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.author.id !== undefined) {
            this.subscribeToSaveResponse(this.authorService.update(this.author));
        } else {
            this.subscribeToSaveResponse(this.authorService.create(this.author));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAuthor>>) {
        result.subscribe((res: HttpResponse<IAuthor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get author() {
        return this._author;
    }

    set author(author: IAuthor) {
        this._author = author;
    }
}
