import { ActiveSubscriptionDto } from "./ActiveSubscriptionDto";

/**
 *
 * @export
 * @interface AccountInfoResponseDto
 */
export interface AccountInfoResponseDto {
    /**
     *
     * @type {string}
     * @memberof AccountInfoResponseDto
     */
    accountId: string;
    /**
     *
     * @type {string}
     * @memberof AccountInfoResponseDto
     */
    firstName: string;
    /**
     *
     * @type {string}
     * @memberof AccountInfoResponseDto
     */
    lastName: string;
    /**
     *
     * @type {string}
     * @memberof AccountInfoResponseDto
     */
    username: string;
    /**
     *
     * @type {string}
     * @memberof AccountInfoResponseDto
     */
    email: string;
    /**
     *
     * @type {string}
     * @memberof AccountInfoResponseDto
     */
    phoneNumber: string;
    /**
     *
     * @type {boolean}
     * @memberof AccountInfoResponseDto
     */
    payAsYouGo: boolean;
    /**
     *
     * @type {number}
     * @memberof AccountInfoResponseDto
     */
    balance: number;
    /**
     *
     * @type {ActiveSubscriptionDto}
     * @memberof AccountInfoResponseDto
     */
    activeSubscription: ActiveSubscriptionDto;
}
