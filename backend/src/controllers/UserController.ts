import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { GeneratePassword, GenerateSalt, ValidatePassword } from '../utility/PasswordUtiility';
import { AuthPayload, DriverRegisterInput } from '../dto';
import { GenerateSignature } from '../utility/TokenUtility';
import { User, MedicurbLocation, Driver, License } from '../model';
import { DEFAULT_ERROR_MSG, NOT_EXIST_ERROR_MSG, EMAIL_EXIST_ERROR_MSG } from '../config';

