import mongoose, { Document, Schema } from 'mongoose';

interface UserDoc extends Document {
    firstName: string;
    lastName: string;
    birthDate: string;
    profileImage: string;    

    type: string;

    phone: string;
    email: string;
    ssn: string;
    medicalInsurance: string;

    phoneVerified: boolean;
    emailVerified: boolean;

    salt: string;
    password: string;

    location: any;
    driver: any;
    patient: any;


}


const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthDate: { type: String, required: true },
        profileImage: { type: String },        
        type: { type: String, required: true }, // driver / patient

        phone: { type: String, required: true },
        email: { type: String },
        ssn: { type: String },
        medicalInsurance: { type: String },

        phoneVerified: { type: Boolean },
        emailVerified: { type: Boolean },

        salt: { type: String, required: true },
        password: { type: String, required: true },

        location: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Location',
            required: true,
        },

        driver: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Driver',
        },

        patient: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Patient',
        },


    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;         
                delete ret.password;
                delete ret.salt;
                delete ret._id;
                delete ret.driver;
                delete ret.patient;
            }
        }
    }
);


const User = mongoose.model<UserDoc>('User', userSchema);

export { User };
