/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipTestModule } from '../../../test.module';
import { SuperuserComponent } from 'app/entities/superuser/superuser.component';
import { SuperuserService } from 'app/entities/superuser/superuser.service';
import { Superuser } from 'app/shared/model/superuser.model';

describe('Component Tests', () => {
    describe('Superuser Management Component', () => {
        let comp: SuperuserComponent;
        let fixture: ComponentFixture<SuperuserComponent>;
        let service: SuperuserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipTestModule],
                declarations: [SuperuserComponent],
                providers: []
            })
                .overrideTemplate(SuperuserComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SuperuserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuperuserService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Superuser(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.superusers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
