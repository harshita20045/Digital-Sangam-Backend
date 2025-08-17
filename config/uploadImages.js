import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'articles/images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});

export const uploadImages = multer({ storage: imageStorage });
