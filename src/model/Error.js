class ErrStatus extends Error {
  constructor(message, status, error, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrStatus);
    }

    this.message = message;
    this.status = status;
    this.error = error;
  }
}

export default ErrStatus;
