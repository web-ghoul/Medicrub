import mongoose, { Document, Schema } from 'mongoose';

interface TripDoc extends Document {
    driver: any;
    patient: any;
    addedBy: any;
    updatedBy: any;
    pickup: any;
    destination: any;    
    date: string;
    time: string;

    number: string;    

    startedAt: string;
    arrivedAt: string;
    finishedAt: string;
    signature: string;

    specialNeeds: string;
    cost: number;
    mileage: number;

}


const tripSchema = new Schema(
    {
        driver: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Driver',
        },

        patient: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'User',
        },

        pickup: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'Location',
        },

        destination: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'Location',
        },

        addedBy: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'Admin',
        },

        updatedBy: {
            type: mongoose.SchemaTypes.ObjectId,        
            ref: 'Admin',
        },

        date: {
            type: String,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        cost: {
            type: Number,
            required: true,
        },

        number: { type: String },        

        startedAt: { type: String },
        arrivedAt: { type: String },
        finishedAt: { type: String },

        signature: { type: String },
        specialNeeds: { type: String },
        mileage: { type: Number },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
                delete ret.addedBy;
                delete ret.updatedBy;
            }
        }
    }
);


const Trip = mongoose.model<TripDoc>('Trip', tripSchema);

export { Trip };