import { VerifyOTPResponseStatusEnum } from "./VerifyOTPResponseStatusEnum";
/**
 *
 * @export
 * @interface VerifyOTPResponse
 */
export interface VerifyOTPResponse {
    /**
     *
     * @type {string}
     * @memberof VerifyOTPResponse
     */
    status: VerifyOTPResponseStatusEnum;
    /**
     *
     * @type {string}
     * @memberof VerifyOTPResponse
     */
    message: string;
}
