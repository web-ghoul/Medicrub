import mongoose, { Document, Schema } from 'mongoose';

interface LocationDoc extends Document {
    latitude: string;
    logitude: string;
    address: string;
    coordinates: number[];

}


const locationSchema = new Schema(
    {
        latitude: {
            type: String,
            required: true,
        },

        longitude: {
            type: String,
            required: true,
        },

        coordinates: {
            type: [Number],
            index: '2dsphere', // Create a geospatial index
        },

        address: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret._id;
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        }
    }
);


const MedicurbLocation = mongoose.model<LocationDoc>('Location', locationSchema);

export { MedicurbLocation };