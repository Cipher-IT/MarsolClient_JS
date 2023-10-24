import { Axios, AxiosError } from "axios";
import { MarsolException } from "./exceptions/marsol.exception";
import { RequestDto, MessageResponseDto, PhoneBookSMSRequestDto, HealthResponse, NewOtpRequest, OtpResponse, OS } from "./dto";

export class MarsolClient {
  private readonly publicApiUrl = "/public";
  private readonly client: Axios = new Axios();
  public apiToken: string | null = null;
  /**
   *
   */
  constructor(_apiToken: string | null = null, private readonly environment: MarsolEnvironmentEnum = MarsolEnvironmentEnum.PRODUCTION) {
    this.client.defaults.baseURL = environment;
    this.apiToken = _apiToken;
  }

  async sendSMSAsync(request: RequestDto): Promise<MessageResponseDto> {
    if (!this.apiToken) {
      throw new MarsolException("API Token is required");
    }

    if (!request) {
      throw new MarsolException("Request data is required");
    }

    if (!request.message) {
      throw new MarsolException("Message is required");
    }

    if (!request.phoneNumbers || request.phoneNumbers.length === 0) {
      throw new MarsolException("Phone number is required");
    }

    const response = await this.client
      .post<any, MessageResponseDto, RequestDto>(`${this.publicApiUrl}/sms/send`, request, { headers: { "x-auth-token": this.apiToken } })
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });

    return response;
  }

  async sendSMSToPhoneBookAsync(message: string, phoneBookId: string, senderId: string | undefined = undefined): Promise<MessageResponseDto> {
    if (!this.apiToken) {
      throw new MarsolException("API Token is required");
    }

    if (!message) {
      throw new MarsolException("Message is required");
    }

    if (!phoneBookId) {
      throw new MarsolException("Phone book id is required");
    }

    const response = await this.client
      .post<any, MessageResponseDto, PhoneBookSMSRequestDto>(
        `${this.publicApiUrl}/sms/send-phonebook`,
        {
          message,
          phonebookId: phoneBookId,
          senderId,
        },
        { headers: { "x-auth-token": this.apiToken } }
      )
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });

    return response;
  }

  async checkServiceHealthAsync(): Promise<HealthResponse> {
    const response = await this.client.get<any, HealthResponse>(`/health`).catch((e: AxiosError<{ message: string }>) => {
      throw new MarsolException(e?.response?.data?.message ?? e.message);
    });

    return response;
  }

  async initiateOtpRequestAsync(request: NewOtpRequest): Promise<OtpResponse> {
    if (!this.apiToken) {
      throw new MarsolException("توكن الوصول مطلوب");
    }
    request.clientOs = request.clientOs ?? OS.WEB;
    if (!request) {
      throw new MarsolException("البيانت المطلوبة غير متوفرة");
    }

    if (!request.phoneNumber) {
      throw new MarsolException("رقم الهاتف مطلوب");
    }

    const response = await this.client
      .post<any, OtpResponse, NewOtpRequest>(`${this.publicApiUrl}/otp/initiate`, request, { headers: { "x-auth-token": this.apiToken } })
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });

    return response;
  }
}

export enum MarsolEnvironmentEnum {
  PRODUCTION = "https://api.marsol.ly",
  STAGING = "https://staging.marsol.ly",
}
