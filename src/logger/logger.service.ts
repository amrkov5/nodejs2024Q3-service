import { Injectable, LoggerService } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { config } from 'dotenv';
config();

@Injectable()
export class CustomLogger implements LoggerService {
  pathToLogs = '/var/log/web/ml';

  async isFileCreated(type: string): Promise<string> {
    try {
      const files = await fs.promises.readdir(this.pathToLogs);
      const foundFiles = files.filter((file) => file.startsWith(type));
      return foundFiles.sort()[foundFiles.length - 1];
    } catch (err) {
      this.error(err);
      throw err;
    }
  }

  async writeLogToFile(message: string, type: string) {
    let fileName = await this.isFileCreated(type);

    const pathToFile = path.join(this.pathToLogs, fileName);

    fs.stat(pathToFile, (err, stats) => {
      if (stats.size >= Number(process.env.LOG_FILE_SIZE) * 1024) {
        fileName = `${type}-${new Date().toISOString()}`;
      }
      const writeStream = fs.createWriteStream(
        path.join(this.pathToLogs, fileName),
        { flags: 'a' },
      );
      writeStream.write(`${message}\n`);
      writeStream.end();
    });
  }

  async log(message: string) {
    if (Number(process.env.LOG_LEVEL) > 0) {
      await this.writeLogToFile(
        `[LOG] ${new Date().toISOString()}: ${message}`,
        'log',
      );
      console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
    }
  }

  async error(message: string, trace?: string) {
    await this.writeLogToFile(
      `[ERROR] ${new Date().toISOString()}: ${message}`,
      'error',
    );
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    if (trace) console.error(trace);
  }

  warn(message: string) {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
  }

  async verbose(message: string) {
    if (Number(process.env.LOG_LEVEL) === 2) {
      await this.writeLogToFile(
        `[VERBOSE] ${new Date().toISOString()}: ${message}`,
        'log',
      );
      console.info(`[VERBOSE] ${new Date().toISOString()}: ${message}`);
    }
  }
}
