import { MarsolClient } from "..";
import { OTPType, OtpResponse, ResendOTPResponseDto } from "../dto";
export declare class MarsolOtpResponse implements OtpResponse {
    private readonly client;
    /**
     *
     */
    constructor(response: OtpResponse, client: MarsolClient);
    expiration: number;
    price: number;
    requestId: string;
    resendToken: string;
    resendAsync(operation?: OTPType): Promise<ResendOTPResponseDto>;
}
