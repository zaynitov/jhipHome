/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipTestModule } from '../../../test.module';
import { SuperuserUpdateComponent } from 'app/entities/superuser/superuser-update.component';
import { SuperuserService } from 'app/entities/superuser/superuser.service';
import { Superuser } from 'app/shared/model/superuser.model';

describe('Component Tests', () => {
    describe('Superuser Management Update Component', () => {
        let comp: SuperuserUpdateComponent;
        let fixture: ComponentFixture<SuperuserUpdateComponent>;
        let service: SuperuserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipTestModule],
                declarations: [SuperuserUpdateComponent]
            })
                .overrideTemplate(SuperuserUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SuperuserUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuperuserService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Superuser(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.superuser = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Superuser();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.superuser = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
