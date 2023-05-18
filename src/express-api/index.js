import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import multer from 'multer'
import { Configuration, OpenAIApi } from 'openai'
import { Readable } from 'node:stream'
import uploadConfig from './upload.js'

async function getTranscription (audioBuffer, language, format) {
	try {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    })
    
    const openai = new OpenAIApi(configuration)
    const audioReadStream = Readable.from(audioBuffer)
    audioReadStream.path = 'audio.mp3';
    
    const transcription = await openai.createTranscription(audioReadStream, 'whisper-1', undefined, format || 'text', 0, language)
		return transcription?.data
	} catch (error) {
    return 'erro'
	}
}

const app = express()
app.use(express.json())

const upload = multer(uploadConfig.multer)

app.post('/api/upload-audio', upload.single('audio-input'), async (req, res) => {
  const { language, format } = req.body
	const result = await getTranscription(req.file.buffer, language, format)
  return res.status(200).json({ message: result })
})

const port = Number(process.env.PORT) || 3333

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});