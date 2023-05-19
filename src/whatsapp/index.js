import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import twilio from 'twilio'
const { MessagingResponse } = twilio.twiml
import bodyParser from 'body-parser'
import axios from 'axios'
import fs from 'node:fs'
import ffmpeg from 'fluent-ffmpeg'
import { Readable } from 'node:stream'
import { Configuration, OpenAIApi } from 'openai'

const authToken = process.env.TWILIO_AUTH_TOKEN

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  bodyParser.json({
    verify: (request, response, buf) => {
      request.rawBody = buf;
    },
  })
)

app.post('/api/receiver/audio', async (req, res) => {
  const configuration = new Configuration({
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
  })
  
  const openai = new OpenAIApi(configuration)

  const url = req.body.MediaUrl0
  const { data } = await axios(url, {
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'audio/ogg'
    }
  })

  const audioReadStream = Readable.from(data)

  const converted = ffmpeg()
    .input(audioReadStream)
    .inputFormat('ogg')
    .format('mp3')
    .pipe()

    converted.path = 'audio.mp3'
    const transcription = await openai.createTranscription(converted, 'whisper-1', undefined, 'text', 0, 'en')

    const response = new MessagingResponse();
    response.message(transcription?.data)
    res.writeHead(200, { 'Content-Type': 'text/xml' })
    res.end(response.toString());
})

app.post('/api/receiver/audio/read-from-file', async (req, res) => {
  const url = req.body.MediaUrl0
  let writer = fs.createWriteStream("file.ogg")
  const response = await axios(url, { responseType: 'stream' })
  response.data.pipe(writer)
  writer.on('finish', () => res.end())
})

app.post('/api/receiver/text', async (req, res) => {
  const response = new MessagingResponse();
  response.message(`Your text to me was ${req.body.Body}.`)
  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.end(response.toString());
})


const port = Number(process.env.PORT) || 3333

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});