/**
 *
 * @export
 * @interface ResendOTPRequestDTO
 */
export interface ResendOTPRequestDTO {
    /**
     *
     * @type {string}
     * @memberof ResendOTPRequestDTO
     */
    'requestId': string;
    /**
     *
     * @type {string}
     * @memberof ResendOTPRequestDTO
     */
    'resendToken': string;
    /**
     *
     * @type {string}
     * @memberof ResendOTPRequestDTO
     */
    'operation': string;
}
