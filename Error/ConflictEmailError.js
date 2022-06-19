class ConflictEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictEmailError';
    this.statusCode = 409;
  }
}

module.exports = ConflictEmailError;
