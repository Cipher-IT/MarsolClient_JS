"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsolResendOtpResponse = void 0;
const dto_1 = require("../dto");
const marsol_exception_1 = require("../exceptions/marsol.exception");
class MarsolResendOtpResponse {
    /**
     *
     */
    constructor(response, client) {
        this.requestId = response.requestId;
        this.resendToken = response.resendToken;
        this.remainingRetries = response.remainingRetries;
        this.client = client;
    }
    resendAsync(operation = dto_1.OTPType.CODE) {
        if (this.remainingRetries <= 0)
            throw new marsol_exception_1.MarsolException("لا يمكن إعادة الإرسال");
        return this.client.resendOtpRequestAsync(this.requestId, this.resendToken, operation);
    }
}
exports.MarsolResendOtpResponse = MarsolResendOtpResponse;
