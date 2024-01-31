import mongoose, { Document, Schema } from 'mongoose';

interface LocationDoc extends Document {
    latitude: string;
    logitude: string;
    altitude: string;
    address: string;

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
  

        address: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, 
        toJSON:{
            transform(doc, ret){
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