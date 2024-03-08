import { IsNotEmpty, IsPositive } from 'class-validator';
import { LocationInput } from './Location.dto';

export class CreateTripInput {
    @IsNotEmpty()
    firstName!: string;
    @IsNotEmpty()
    lastName!: string;
    @IsNotEmpty()
    birthDate!: string;    
    @IsNotEmpty()
    phone!: string;    
    
    @IsNotEmpty()
    type!: string;    

    @IsNotEmpty()
    date!: string;
    @IsNotEmpty()
    time!: string;

    @IsPositive()
    cost!: number;

    pickup!: LocationInput;
    destination!: LocationInput;

    number?: string;             
    specialNeeds?: string;

    driver? : string;
}


export class UpdateTripInput {
 
    firstName?: string;

    lastName?: string;

    birthDate?: string;    

    phone?: string;    

    type?: string;    


    date?: string;

    time?: string;

    @IsPositive()
    cost?: number;

    pickup?: LocationInput;
    destination?: LocationInput;

    number?: string;             
    specialNeeds?: string;    
    driver?: string;
    
}