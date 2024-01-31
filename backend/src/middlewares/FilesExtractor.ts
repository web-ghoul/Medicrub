import { Request } from 'express';
import formidable from 'formidable';

const ExtractForm = async (req: Request) => {
    const form =  formidable({multiples: true});
    const [fields, files] = await form.parse(req); 

    const uploads = files as { [key: string]: [formidable.File] };
    const fieldsObj = fields as { [key: string]: [string] };    
    
    const fieldsValues : { [key: string]: string } = {};
    
    for (const key in fieldsObj) {
        fieldsValues[key] = fieldsObj[key][0] as string;       
    }
      
    return [fieldsValues, uploads];
}

const ExtractFiles = async (req: Request) => {
    const form =  formidable({multiples: true});
    const [fields, files] = await form.parse(req);    
    const uploads = files as { [key: string]: [formidable.File] };
    return uploads;
}

export { ExtractForm, ExtractFiles };