import { IsNotEmpty, Length } from 'class-validator';

export interface AdminPayload {
    _id: string;        
    username: string;            
}


export class CreateAdminInput{
    @IsNotEmpty()
    name!: string;
    @IsNotEmpty()
    username!: string;    
    @Length(8)
    password!: string;
}


