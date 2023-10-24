/**
 *
 * @export
 * @interface OtpResponse
 */
export interface OtpResponse {
    /**
     *
     * @type {number}
     * @memberof OtpResponse
     */
    'expiration': number;
    /**
     *
     * @type {number}
     * @memberof OtpResponse
     */
    'price': number;
    /**
     *
     * @type {string}
     * @memberof OtpResponse
     */
    'requestId': string;
    /**
     *
     * @type {string}
     * @memberof OtpResponse
     */
    'resendToken': string;
}
