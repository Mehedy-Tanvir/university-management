import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result);
        }
        // delete the file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File successfully deleted.');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/uploads/`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

export const upload = multer({ storage });

// Usage example:
(async () => {
  try {
    const imageName = 'example-image';
    const path = './uploads/example.jpg';
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    console.log('Uploaded Image URL:', secure_url);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
})();
