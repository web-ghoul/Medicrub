import { IsNotEmpty } from 'class-validator';

export class LocationInput {

    @IsNotEmpty()
    latitude!: string;
    @IsNotEmpty()
    longitude!: string;    
    @IsNotEmpty()
    address!: string;

}