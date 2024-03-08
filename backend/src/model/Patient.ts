import mongoose, { Document, Schema } from 'mongoose';

interface PatientDoc extends Document {        
    location: any;    
}


const patientSchema = new Schema(
    {        
        location: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Location',
            required: true,
        },

    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        }
    }
);


const Patient = mongoose.model<PatientDoc>('Patient', patientSchema);

export { Patient };