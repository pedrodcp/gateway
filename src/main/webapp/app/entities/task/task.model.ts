import { BaseEntity, User } from './../../shared';

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public action?: string,
        public deadline?: any,
        public user?: string,
        public stage?: BaseEntity,
        public colaborator?: User,
    ) {
    }
}
