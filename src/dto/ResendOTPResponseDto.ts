/**
 *
 * @export
 * @interface ResendOTPResponseDto
 */
export interface ResendOTPResponseDto {
    /**
     *
     * @type {string}
     * @memberof ResendOTPResponseDto
     */
    'requestId': string;
    /**
     *
     * @type {string}
     * @memberof ResendOTPResponseDto
     */
    'resendToken': string;
    /**
     *
     * @type {number}
     * @memberof ResendOTPResponseDto
     */
    'remainingRetries': number;
}
