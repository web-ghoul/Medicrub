import mongoose, { Document, Schema } from 'mongoose';

interface AdminDoc extends Document {
    name: string;
    username: string;
    salt: string;
    password: string;

}


const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
                delete ret.salt;
                delete ret.password;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        }
    }
);


const Admin = mongoose.model<AdminDoc>('Admin', adminSchema);

export { Admin };