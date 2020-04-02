export class Campo {
    // tslint:disable-next-line: variable-name
    public Cod_Campo: string;
    // tslint:disable-next-line: variable-name
    public Nome_Campo: string;
    public Value: any;

    constructor(
        // tslint:disable-next-line: variable-name
        Cod_Campo = '',
        // tslint:disable-next-line: variable-name
        Nome_Campo = '',
        Value = ''
    ) {}
}
