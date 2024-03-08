import mongoose, { Document, Schema } from 'mongoose';

interface DriverDoc extends Document {
    user: any;
    driverLicense: any;
    nationalCard: any;
    location: any;
    car: any;
    verifiedBy: any;
    updatedBy: any;
    verified: boolean;
    visible: boolean;
    onTrip: boolean;


}


const driverSchema = new Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },


        driverLicense: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'License',
        },


        nationalCard: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'License',
            required: true,
        },


        location: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Location',
            // index: '2dsphere',
            required: true,
        },


        car: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Car',
        },


        verifiedBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Admin',
        },

        updatedBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Admin',
        },

        verified: { type: Boolean, required: true },
        visible: { type: Boolean, required: true },
        onTrip: { type: Boolean, required: true },

    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
                delete ret.verifiedBy;
                delete ret.updatedBy;
            }
        }
    }
);


const Driver = mongoose.model<DriverDoc>('Driver', driverSchema);

export { Driver };


