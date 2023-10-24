/**
 *
 * @export
 * @interface RequestDto
 */
export interface RequestDto {
    /**
     *
     * @type {string}
     * @memberof RequestDto
     */
    message: string;
    /**
     *
     * @type {Array<string>}
     * @memberof RequestDto
     */
    phoneNumbers: Array<string>;
    /**
     *
     * @type {string}
     * @memberof RequestDto
     */
    senderId?: string;
}
