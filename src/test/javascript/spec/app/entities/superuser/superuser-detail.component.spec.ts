/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipTestModule } from '../../../test.module';
import { SuperuserDetailComponent } from 'app/entities/superuser/superuser-detail.component';
import { Superuser } from 'app/shared/model/superuser.model';

describe('Component Tests', () => {
    describe('Superuser Management Detail Component', () => {
        let comp: SuperuserDetailComponent;
        let fixture: ComponentFixture<SuperuserDetailComponent>;
        const route = ({ data: of({ superuser: new Superuser(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipTestModule],
                declarations: [SuperuserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SuperuserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SuperuserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.superuser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
