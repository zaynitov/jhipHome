import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISuperuser } from 'app/shared/model/superuser.model';

type EntityResponseType = HttpResponse<ISuperuser>;
type EntityArrayResponseType = HttpResponse<ISuperuser[]>;

@Injectable({ providedIn: 'root' })
export class SuperuserService {
    private resourceUrl = SERVER_API_URL + 'api/superusers';

    constructor(private http: HttpClient) {}

    create(superuser: ISuperuser): Observable<EntityResponseType> {
        return this.http.post<ISuperuser>(this.resourceUrl, superuser, { observe: 'response' });
    }

    update(superuser: ISuperuser): Observable<EntityResponseType> {
        return this.http.put<ISuperuser>(this.resourceUrl, superuser, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISuperuser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISuperuser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
