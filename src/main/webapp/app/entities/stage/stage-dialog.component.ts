import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Stage } from './stage.model';
import { StagePopupService } from './stage-popup.service';
import { StageService } from './stage.service';

@Component({
    selector: 'jhi-stage-dialog',
    templateUrl: './stage-dialog.component.html'
})
export class StageDialogComponent implements OnInit {

    stage: Stage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private stageService: StageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stageService.update(this.stage));
        } else {
            this.subscribeToSaveResponse(
                this.stageService.create(this.stage));
        }
    }

    private subscribeToSaveResponse(result: Observable<Stage>) {
        result.subscribe((res: Stage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Stage) {
        this.eventManager.broadcast({ name: 'stageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-stage-popup',
    template: ''
})
export class StagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stagePopupService: StagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stagePopupService
                    .open(StageDialogComponent as Component, params['id']);
            } else {
                this.stagePopupService
                    .open(StageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
