import { RecipientPhoneNumber } from "./RecipientPhoneNumber";

/**
 *
 * @export
 * @interface MessageInfoResponseDto
 */

export interface MessageInfoResponseDto {
    /**
     *
     * @type {string}
     * @memberof MessageInfoResponseDto
     */
    'requestId': string;
    /**
     *
     * @type {string}
     * @memberof MessageInfoResponseDto
     */
    'message': string;
    /**
     *
     * @type {Array<RecipientPhoneNumber>}
     * @memberof MessageInfoResponseDto
     */
    'recipients': Array<RecipientPhoneNumber>;
    /**
     *
     * @type {number}
     * @memberof MessageInfoResponseDto
     */
    'parts': number;
    /**
     *
     * @type {string}
     * @memberof MessageInfoResponseDto
     */
    'timestamp': string;
    /**
     *
     * @type {string}
     * @memberof MessageInfoResponseDto
     */
    'token': string;
}
