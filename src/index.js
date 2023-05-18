import * as dotenv from 'dotenv'
dotenv.config()
import fs from 'node:fs'
import path from 'node:path'
import { Configuration, OpenAIApi } from 'openai'
import { fileURLToPath } from 'url'

const configuration = new Configuration({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, '..' , 'inputs', 'audio-pt.mp3')

const transcription = await openai.createTranscription(fs.createReadStream(filePath), 'whisper-1')

console.log(transcription.data.text)