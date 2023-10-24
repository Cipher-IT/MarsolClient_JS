import { MarsolClient } from "..";
import { OTPType, ResendOTPResponseDto } from "../dto";
export declare class MarsolResendOtpResponse implements ResendOTPResponseDto {
    private readonly client;
    /**
     *
     */
    constructor(response: ResendOTPResponseDto, client: MarsolClient);
    requestId: string;
    resendToken: string;
    remainingRetries: number;
    resendAsync(operation?: OTPType): Promise<MarsolResendOtpResponse>;
}
