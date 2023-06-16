export interface IReturned{
    returned: boolean;
}


export class CarReturnedValues implements IReturned{
    returned: boolean = false; 
    
    constructor(init?: CarReturnedValues){
        Object.assign(this, init);
    }
}