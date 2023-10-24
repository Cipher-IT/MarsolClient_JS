/**
 *
 * @export
 * @interface AuthResponseDto
 */
export interface AuthResponseDto {
    /**
     *
     * @type {string}
     * @memberof AuthResponseDto
     */
    accessToken: string;
    /**
     *
     * @type {string}
     * @memberof AuthResponseDto
     */
    refreshToken: string;
    /**
     *
     * @type {string}
     * @memberof AuthResponseDto
     */
    accountId: string;
    /**
     *
     * @type {number}
     * @memberof AuthResponseDto
     */
    firstName: number;
    /**
     *
     * @type {number}
     * @memberof AuthResponseDto
     */
    lastName: number;
    /**
     *
     * @type {string}
     * @memberof AuthResponseDto
     */
    username: string;
    /**
     *
     * @type {string}
     * @memberof AuthResponseDto
     */
    email: string;
    /**
     *
     * @type {string}
     * @memberof AuthResponseDto
     */
    phoneNumber: string;
    /**
     *
     * @type {boolean}
     * @memberof AuthResponseDto
     */
    payAsYouGo: boolean;
    /**
     *
     * @type {number}
     * @memberof AuthResponseDto
     */
    subscriptionId: number;
    /**
     *
     * @type {boolean}
     * @memberof AuthResponseDto
     */
    verified: boolean;
}
