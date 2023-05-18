import crypto from 'node:crypto'
import multer from 'multer'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadsFolder = path.resolve(__dirname, 'uploads');

export default {
  uploadsFolder,
  multer: {
    storage: multer.diskStorage({
      destination: uploadsFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      },
    }),
  },
}