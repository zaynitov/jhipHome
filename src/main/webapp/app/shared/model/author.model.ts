export interface IAuthor {
    id?: number;
    autorname?: string;
}

export class Author implements IAuthor {
    constructor(public id?: number, public autorname?: string) {}
}
