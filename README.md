<h1 align="center">
  🗣️ Speech to Text API 📝
</h1>

<h4 align="center">
  API that transforms audio in text using Artificial Intelligence
</h4>


<p align="center">
  <a href="https://github.com/Nozbe/WatermelonDB/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License">
  </a>
</p>

|     | Built with                                                                                                                            |
| --- | -------------------------------------------------------------------------------------------------------------------------------- |
| ✨ | **Node.js 18**                                                                                |
| 📈  | **OpenAI** API for speech to text and completions.                                         |
| 🤖  | **Fluent FFMPEG** Tool to transform video and audio (used to convert .ogg to .mp3).                                                      |
| 💎  | **Twilio**. API for Twilio, a middleware platform for whatsapp.                                                                                    |
| 🧙🏼‍♀️  | **TypeScript** typed programming language that builds on JavaScript.                                                                                          |

## Functionality

Studies about OpenAI and speech to text.

These studies are separated in 3 versions: offline-local-files, express-api and whatsapp.

### offline-local-files

First step of study, realising how to get a .MP3 audio buffer from a local directory and send it directly to openAI platform. It will be the base to the further studies.

### express-api

This second step allows user to send an audio using multipart data HTTP request. This sent audio will be then converted from speech to text using openAI platform.

### whatsapp

In the last study, Twilio is used as a whatsapp middleware platform. User is able to send a default audio whatsapp to the registered number in Twilio that, in its turn, will send audio buffer to application through websocket. As whatsapp audios are .OGG, application will transform it in .MP3 using FFMPEG, transform it into text using openAI platform and answer client in whatsapp with audio message transcribed.


## Execution
1. Install dependencies with `npm` or `yarn`

```js
npm install //or
yarn

```
2. Fill a `.env` file in root folder with you APIs and other informations

```js
API_PORT=3333
OPENAI_API_KEY=
ORGANIZATION_ID=
MODEL=gpt-3.5-turbo
TWILIO_AUTH_TOKEN=
TWILIO_ACCOUNT_SID=
```

3. run one of options

```js
yarn dev:local // for offline-local-files
yarn dev:api // for express-api
yarn dev:whatsapp // for whatsapp
```


## Author and license

This project was created by [@CaiqueRibeiro](https://github.com/CaiqueRibeiro).

This project is available under the MIT license. See the [LICENSE file](./LICENSE) for more info.