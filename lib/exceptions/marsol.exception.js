"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsolException = void 0;
class MarsolException extends Error {
    constructor(message) {
        super(message);
        this.name = 'MarsolException';
    }
}
exports.MarsolException = MarsolException;
