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


}


const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthDate: { type: String, required: true },
        profileImage: { type: String, required: true },        
        type: { type: String, required: true }, // driver / patient

        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        ssn: { type: String, required: true },
        medicalInsurance: { type: String, required: true },

        phoneVerified: { type: Boolean, required: true },
        emailVerified: { type: Boolean, required: true },

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
            }
        }
    }
);


const User = mongoose.model<UserDoc>('User', userSchema);

export { User };