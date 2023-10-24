import { MarsolClient } from "..";
import { OTPType, OtpResponse, ResendOTPResponseDto } from "../dto";
import { MarsolException } from "../exceptions/marsol.exception";

export class MarsolResendOtpResponse implements ResendOTPResponseDto {
  private readonly client: MarsolClient;
  /**
   *
   */
  constructor(response: ResendOTPResponseDto, client: MarsolClient) {
    this.requestId = response.requestId;
    this.resendToken = response.resendToken;
    this.remainingRetries = response.remainingRetries;
    this.client = client;
  }
  requestId: string;
  resendToken: string;
  remainingRetries: number;
  

  resendAsync(operation: OTPType = OTPType.CODE): Promise<MarsolResendOtpResponse> {
    if(this.remainingRetries <= 0) 
      throw new MarsolException("لا يمكن إعادة الإرسال");
    return this.client.resendOtpRequestAsync(this.requestId, this.resendToken, operation);
  }
}
