import { MarsolClient } from "..";
import { OTPType, OtpResponse, ResendOTPResponseDto } from "../dto";

export class MarsolOtpResponse implements OtpResponse {
  private readonly client: MarsolClient;
  /**
   *
   */
  constructor(response: OtpResponse, client: MarsolClient) {
    this.expiration = response.expiration;
    this.price = response.price;
    this.requestId = response.requestId;
    this.resendToken = response.resendToken;
    this.client = client;
  }
  
  expiration: number;
  price: number;
  requestId: string;
  resendToken: string;

  resendAsync(operation: OTPType = OTPType.CODE): Promise<ResendOTPResponseDto> {
    return this.client.resendOtpRequestAsync(this.requestId, this.resendToken, operation);
  }
}
