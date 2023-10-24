import { Duplicate } from "./Duplicate";

/**
 *
 * @export
 * @interface MessageResponseDto
 */

export interface MessageResponseDto {
    /**
     *
     * @type {string}
     * @memberof MessageResponseDto
     */
    'requestId': string;
    /**
     *
     * @type {number}
     * @memberof MessageResponseDto
     */
    'accepted': number;
    /**
     *
     * @type {Array<string>}
     * @memberof MessageResponseDto
     */
    'rejected': Array<string>;
    /**
     *
     * @type {Array<Duplicate>}
     * @memberof MessageResponseDto
     */
    'duplicates': Array<Duplicate>;
}
