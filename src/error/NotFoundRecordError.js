class NotFoundRecordError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundRecordError";
    this.message = message;
  }
}

module.exports = NotFoundRecordError;
