/**
 *
 * @export
 * @interface VerifyOTPRequest
 */
export interface VerifyOTPRequest {
    /**
     * OTP Code
     * @type {string}
     * @memberof VerifyOTPRequest
     */
    code: string;
    /**
     * Request Id
     * @type {string}
     * @memberof VerifyOTPRequest
     */
    requestId: string;
    /**
     * OTP type
     * @type {string}
     * @memberof VerifyOTPRequest
     */
    operation: string;
}
