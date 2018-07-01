export default class ResError extends Error {
  status?: number;
  notError?: boolean;
  constructor(message: string, status?: number, notError?: boolean) {
    super(message);
    this.status = status;
    this.notError = typeof notError !== 'undefined' ? notError : true;
  }
}
