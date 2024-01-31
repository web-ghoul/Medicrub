import { DriverPayload } from "./Driver.dto";
import { AdminPayload } from "./Admin.dto";

import { IsNotEmpty } from 'class-validator';

export type AuthPayload = DriverPayload | AdminPayload;

export class LoginInput{
    @IsNotEmpty()
    username!: string;
    @IsNotEmpty()
    password!: string;
}