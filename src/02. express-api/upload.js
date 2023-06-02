import crypto from 'node:crypto'
import multer from 'multer'
import path from 'node:path'
import { fileURLToPath } from 'url'


export default {
  multer: {
    storage: multer.memoryStorage(),
  },
}