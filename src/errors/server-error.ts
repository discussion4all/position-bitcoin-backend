import { CustomError } from './custom-error';

export class ServerError extends CustomError {
  statusCode = 500;

  constructor() {
    super('Something went wrong');

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Something went wrong' }];
  }
}
