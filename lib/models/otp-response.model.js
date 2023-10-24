"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsolOtpResponse = void 0;
const dto_1 = require("../dto");
class MarsolOtpResponse {
    /**
     *
     */
    constructor(response, client) {
        this.expiration = response.expiration;
        this.price = response.price;
        this.requestId = response.requestId;
        this.resendToken = response.resendToken;
        this.client = client;
    }
    resendAsync(operation = dto_1.OTPType.CODE) {
        return this.client.resendOtpRequestAsync(this.requestId, this.resendToken, operation);
    }
}
exports.MarsolOtpResponse = MarsolOtpResponse;
