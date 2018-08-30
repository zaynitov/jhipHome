export interface ISuperuser {
    id?: number;
    superusername?: string;
}

export class Superuser implements ISuperuser {
    constructor(public id?: number, public superusername?: string) {}
}
