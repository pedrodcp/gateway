import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import { GatewayAdminModule } from '../../admin/admin.module';
import {
    TaskService,
    TaskPopupService,
    TaskComponent,
    TaskDetailComponent,
    TaskDialogComponent,
    TaskPopupComponent,
    TaskDeletePopupComponent,
    TaskDeleteDialogComponent,
    taskRoute,
    taskPopupRoute,
    TaskResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...taskRoute,
    ...taskPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        GatewayAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TaskComponent,
        TaskDetailComponent,
        TaskDialogComponent,
        TaskDeleteDialogComponent,
        TaskPopupComponent,
        TaskDeletePopupComponent,
    ],
    entryComponents: [
        TaskComponent,
        TaskDialogComponent,
        TaskPopupComponent,
        TaskDeleteDialogComponent,
        TaskDeletePopupComponent,
    ],
    providers: [
        TaskService,
        TaskPopupService,
        TaskResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTaskModule {}
