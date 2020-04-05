export class Campo {
    // tslint:disable-next-line: variable-name
    public cod_campo: string;
    // tslint:disable-next-line: variable-name
    public nome_campo: string;
    public value: any;

    constructor(
        // tslint:disable-next-line: variable-name
        cod_campo = '',
        // tslint:disable-next-line: variable-name
        nome_campo = '',
        value = ''
    ) {}
}
