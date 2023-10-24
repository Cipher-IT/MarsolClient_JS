/**
 *
 * @export
 * @interface ActiveSubscriptionDto
 */
export interface ActiveSubscriptionDto {
    /**
     *
     * @type {string}
     * @memberof ActiveSubscriptionDto
     */
    'name': string;
    /**
     *
     * @type {number}
     * @memberof ActiveSubscriptionDto
     */
    'quota': number;
    /**
     *
     * @type {number}
     * @memberof ActiveSubscriptionDto
     */
    'remainingQuota': number;
    /**
     *
     * @type {number}
     * @memberof ActiveSubscriptionDto
     */
    'usedQuota': number;
    /**
     *
     * @type {string}
     * @memberof ActiveSubscriptionDto
     */
    'createdAt': string;
    /**
     *
     * @type {string}
     * @memberof ActiveSubscriptionDto
     */
    'expirationDate': string;
}
