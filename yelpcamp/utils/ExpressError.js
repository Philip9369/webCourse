class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCodet = statusCode;
    }
}

module.exports = ExpressError;