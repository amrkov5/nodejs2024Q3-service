import { Request } from 'express';

export default function createLogMessage(
  request: Request,
  instance: string,
  code?: string,
) {
  return `Incoming request: Request URL: ${request.protocol}://${request.get(
    'host',
  )}/${instance}, Request method: ${request.method}${
    request.params
      ? `, Request parameters: ${JSON.stringify(request.params)}`
      : ''
  }${
    request.body ? `, Request body: ${JSON.stringify(request.body)}` : ''
  }, Response status code: ${code}`;
}
