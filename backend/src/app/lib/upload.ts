import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../utils';
import status from 'http-status';
import fs from 'fs';

const allowedMimeTypes = [
  'text/plain', // .txt
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = './uploads';

    // Ensure directory exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Validate MIME type
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new AppError(
          status.BAD_REQUEST,
          'Only .txt and .docx files are allowed'
        ),
        null as any
      );
    }

    cb(null, folderPath);
  },

  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/\s+/g, '-');
    const uniqueName = `${baseName}-${uuidv4()}${ext}`;

    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
