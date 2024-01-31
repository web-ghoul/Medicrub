import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

cloudinary.config({
  cloud_name: 'dactjou6v',
  api_key: '875494135284438',
  api_secret: 'TYjO9TJKmXnBgUkIXe3u7GJ6nQE'
});

const UploadFile = async (file: formidable.File) => {

  return await cloudinary.uploader.upload(file.filepath)
    .then(result => {
      return result.url;
    })
    .catch(e => {
      return null;
    });

}

export { UploadFile };