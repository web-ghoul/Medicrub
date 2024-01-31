import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { LocationInput } from './Location.dto';

export interface DriverPayload {
    _id: string;        
    driverID: string;
    verified: boolean;        
    hasDriverLicense: boolean;        
    hasCar: boolean;            
}


export class DriverRegisterInput{

    @IsNotEmpty()
    firstName!: string;
    @IsNotEmpty()
    lastName!: string;
    @IsNotEmpty()
    birthDate!: string;

    @IsEmail()
    email!: string;
    @IsNotEmpty()
    phone!: string;
    @IsNotEmpty()
    ssn!: string;
    @IsNotEmpty()
    medicalInsurance!: string;
        
    @IsNotEmpty()
    latitude!: string;    
    @IsNotEmpty()
    longitude!: string;            
    @IsNotEmpty()
    address!: string;
    
    @Length(8)
    password!: string;
        

}


export class DriverUpdateInput{
    @IsNotEmpty()
    firstName!: string;
    @IsNotEmpty()
    lastName!: string;
    @IsNotEmpty()
    birthDate!: string;

    @IsEmail()
    email!: string;
    @IsNotEmpty()
    phone!: string;
    @IsNotEmpty()
    ssn!: string;
    @IsNotEmpty()
    medicalInsurance!: string;
        
    @IsNotEmpty()
    latitude!: string;    
    @IsNotEmpty()
    longitude!: string;            
    @IsNotEmpty()
    address!: string;
    
}