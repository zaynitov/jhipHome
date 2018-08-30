/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipTestModule } from '../../../test.module';
import { SuperuserDeleteDialogComponent } from 'app/entities/superuser/superuser-delete-dialog.component';
import { SuperuserService } from 'app/entities/superuser/superuser.service';

describe('Component Tests', () => {
    describe('Superuser Management Delete Component', () => {
        let comp: SuperuserDeleteDialogComponent;
        let fixture: ComponentFixture<SuperuserDeleteDialogComponent>;
        let service: SuperuserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipTestModule],
                declarations: [SuperuserDeleteDialogComponent]
            })
                .overrideTemplate(SuperuserDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SuperuserDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuperuserService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
