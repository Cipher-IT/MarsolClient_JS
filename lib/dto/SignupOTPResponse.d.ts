/**
 *
 * @export
 * @interface SignupOTPResponse
 */
export interface SignupOTPResponse {
    /**
     *
     * @type {number}
     * @memberof SignupOTPResponse
     */
    expiration: number;
    /**
     *
     * @type {string}
     * @memberof SignupOTPResponse
     */
    requestId: string;
    /**
     *
     * @type {string}
     * @memberof SignupOTPResponse
     */
    resendToken: string;
}
