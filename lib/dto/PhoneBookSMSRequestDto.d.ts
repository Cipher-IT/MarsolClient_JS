/**
 *
 * @export
 * @interface PhoneBookSMSRequestDto
 */
export interface PhoneBookSMSRequestDto {
    /**
     *
     * @type {string}
     * @memberof PhoneBookSMSRequestDto
     */
    message: string;
    /**
     *
     * @type {string}
     * @memberof PhoneBookSMSRequestDto
     */
    phonebookId: string;
    /**
     *
     * @type {string}
     * @memberof PhoneBookSMSRequestDto
     */
    senderId?: string;
}
