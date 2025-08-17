import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const audioStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'dialects/audio',
    resource_type: 'video', 
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});

export const uploadAudio = multer({ storage: audioStorage });
