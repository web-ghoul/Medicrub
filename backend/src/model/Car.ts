import mongoose, { Document, Schema } from 'mongoose';

interface CarAlbumDoc extends Document {
    car: any;
    front: string;
    back: string;
    right: string;
    left: string;
}


const carAlbumSchema = new Schema(
    {
        car: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Car',
            required: true,
        },

        front: {
            type: String,
            required: true,
        },

        back: {
            type: String,
            required: true,
        },

        right: {
            type: String,
            required: true,
        },

        left: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
                delete ret._id;
                delete ret.car;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        }
    }
);


const CarAlbum = mongoose.model<CarAlbumDoc>('CarAlbum', carAlbumSchema);

/* -------------------------------------------------------------------------- */
/*                                     Car                                    */
/* -------------------------------------------------------------------------- */

interface CarDoc extends Document {
    driver: any;
    carAlbum: any;

    registration: string;
    insurance: string;

    carType: string;
    carModel: string;
    plateNum: string;
    color: string;
}


const carSchema = new Schema(
    {

        driver: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Driver',
            required: true,
        },

        carAlbum: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'CarAlbum',
        },

        registration: {
            type: String,
            required: true,
        },

        insurance: {
            type: String,
            required: true,
        },



        carType: {
            type: String,
            required: true,
        },

        carModel: {
            type: String,
            required: true,
        },

        plateNum: {
            type: String,
            required: true,
        },

        color: {
            type: String,
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
)


const Car = mongoose.model<CarDoc>('Car', carSchema);

export { CarAlbum, Car };