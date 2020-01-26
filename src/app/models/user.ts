export class User {
    
    /* Constructor */
    constructor(

        /* Properties */
        public email: string = "",
        public password: string = "",
        public name: string = "",
        public token: string = "",
        public type: string = "",
        public loggedIn: boolean = false,
        public userId: string = "",
        public adminP: number = 0

    ) { }
}