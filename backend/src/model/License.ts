import mongoose, { Document, Schema } from 'mongoose';

interface LicenseDoc extends Document {
    front: string;
    back: string;
    type: string;

}


const licenseSchema = new Schema(
    {
        front: {
            type: String,
            required: true,
        },
        back: {
            type: String,
            required: true,
        },        
          
        
        // driver / car / national_card
        type: {
            type: String,
            required: true,                                    
        } 
    },
    {
        timestamps: true,
        toJSON:{
            transform(doc, ret){
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;                
            }
        }
    }
);


const License = mongoose.model<LicenseDoc>('License', licenseSchema);

export { License };