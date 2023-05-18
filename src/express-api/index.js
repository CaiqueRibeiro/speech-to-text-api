import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import fs from 'node:fs'
import multer from 'multer'
import { Configuration, OpenAIApi } from 'openai'
import uploadConfig from './upload.js'

async function getTranscription (path) {
	try {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    })
    
    const openai = new OpenAIApi(configuration)
    const transcription = await openai.createTranscription(fs.createReadStream(path), 'whisper-1', undefined, 'text', 0, 'pt')
		return transcription?.data
	} catch (error) {
    return 'erro'
	}
}

const app = express()
app.use(express.json())

const upload = multer(uploadConfig.multer)

app.post('/api/upload-audio', upload.single('audio-input'), async (req, res) => {
	const result = await getTranscription(req.file.path)
  fs.promises.unlink(req.file.path);
  return res.status(200).json({ message: result })
})

const port = Number(process.env.PORT) || 3333

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});