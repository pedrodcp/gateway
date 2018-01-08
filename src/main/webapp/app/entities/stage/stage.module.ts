import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    StageService,
    StagePopupService,
    StageComponent,
    StageDetailComponent,
    StageDialogComponent,
    StagePopupComponent,
    StageDeletePopupComponent,
    StageDeleteDialogComponent,
    stageRoute,
    stagePopupRoute,
    StageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stageRoute,
    ...stagePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StageComponent,
        StageDetailComponent,
        StageDialogComponent,
        StageDeleteDialogComponent,
        StagePopupComponent,
        StageDeletePopupComponent,
    ],
    entryComponents: [
        StageComponent,
        StageDialogComponent,
        StagePopupComponent,
        StageDeleteDialogComponent,
        StageDeletePopupComponent,
    ],
    providers: [
        StageService,
        StagePopupService,
        StageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayStageModule {}
