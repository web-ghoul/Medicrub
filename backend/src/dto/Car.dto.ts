import { IsNotEmpty, Length } from 'class-validator';


export class CreateCarInput{
    @IsNotEmpty()
    carType!: string;
    @IsNotEmpty()
    carModel!: string;
    @IsNotEmpty()
    plateNum!: string;
    @Length(6, 6)
    color!: string;
}