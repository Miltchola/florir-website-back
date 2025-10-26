import multer from 'multer';
import { AppError } from '../utils/errors.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError(400, 'Tipo de arquivo inválido. Apenas imagens são permitidas.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limite de upload de 10MB
  }
});

export const uploadImage = upload.single('imagem');
export const uploadQRCode = upload.single('whatsappQRCode');