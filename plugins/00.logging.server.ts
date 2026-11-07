import { defineNuxtPlugin } from "#app";
import * as winston from "winston";
import DailyRotateFile from 'winston-daily-rotate-file';




export default defineNuxtPlugin(() => {
  const { combine, timestamp, json, errors } = winston.format;
  
  const fileCombinedRotateTransport: DailyRotateFile = new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    });
    const fileErrorRotateTransport: DailyRotateFile = new DailyRotateFile({
      filename: 'logs/app-error-%DATE%.log',
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    });
  
  const logger = winston.createLogger({
    exitOnError: false,
    level: process.env.LOG_LEVEL || 'info',
    format: combine(errors({stack:true}), timestamp(), json()),
    transports: [fileCombinedRotateTransport, fileErrorRotateTransport],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'logs/exception.log' }),
    ],
    rejectionHandlers: [
      new winston.transports.File({ filename: 'logs/rejections.log' }),
    ],
  });

  return {
    provide: {
      logger
    }
  }
});