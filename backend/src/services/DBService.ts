import mongoose from 'mongoose';


export default async (url: string) => {
    try {
        await mongoose.connect(url, { dbName: 'Medicurb' });
        console.log("DB Connected");
    } catch (e) {
        console.log(e);
    }
}