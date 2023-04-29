import axios from 'axios';
import { createWriteStream } from 'fs';
import { dirname, resolve } from 'path';
import ffmpeg from 'fluent-ffmpeg';
import installer from '@ffmpeg-installer/ffmpeg';
import { removeFile } from './remove-file.util';

export class VoiceConvertor {
  constructor() {
    ffmpeg.setFfmpegPath(installer.path);
  }

  toMP3(input: string, output: string) {
    try {
      const outputPath = resolve(dirname(input), `${output}.mp3`);

      return new Promise((resolve, reject) => {
        ffmpeg(input)
          .inputOption('-t 30')
          .output(outputPath)
          .on('end', () => {
            removeFile(input);
            resolve(outputPath);
          })
          .on('error', (err: any) => reject(err.message))
          .run();
      });
    } catch (err: any) {
      console.log('Error while converting to MP3:', err.message);
    }
  }

  async create(url: string, filename: string) {
    const voicePath = resolve(process.cwd(), 'src', 'tmp', 'voices', `${filename}.ogg`);

    try {
      const resp = await axios({
        method: 'get',
        url,
        responseType: 'stream',
      });

      return new Promise((resolve) => {
        const stream = createWriteStream(voicePath);
        resp.data.pipe(stream);
        stream.on('finish', () => resolve(voicePath));
      });
    } catch (err: any) {
      console.log('Error while download file from telegram:', err.message);
    }
  }
}

export const voiceConvertor = new VoiceConvertor();
