export interface IAuthor {
    id?: number;
    name?: string;
}

export class Author implements IAuthor {
    constructor(public id?: number, public name?: string) {}
}
