/**
 *
 * @export
 * @interface CreateTokenRequestDto
 */
export interface CreateTokenRequestDto {
    /**
     *
     * @type {string}
     * @memberof CreateTokenRequestDto
     */
    'projectId': string;
    /**
     *
     * @type {string}
     * @memberof CreateTokenRequestDto
     */
    'name': string;
    /**
     *
     * @type {boolean}
     * @memberof CreateTokenRequestDto
     */
    'enabled': boolean;
    /**
     *
     * @type {number}
     * @memberof CreateTokenRequestDto
     */
    'limit': number;
}
