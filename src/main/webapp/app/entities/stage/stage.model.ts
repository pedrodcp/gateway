import { BaseEntity } from './../../shared';

export class Stage implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public tasks?: BaseEntity[],
    ) {
    }
}
