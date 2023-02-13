class httpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * Status code: 401
 */
export class UnauthorizedError extends httpError {}

/**
 * Status code: 409
 */
export class ConflictError extends httpError {}

// Add more error classes if you need distinction