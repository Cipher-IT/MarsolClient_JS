import { Axios, AxiosError } from "axios";
import { MarsolException } from "./exceptions/marsol.exception";
import {
  RequestDto,
  MessageResponseDto,
  PhoneBookSMSRequestDto,
  HealthResponse,
  NewOtpRequest,
  OtpResponse,
  OS,
  CodeLength,
  Language,
  OtpExpiration,
  ResendOTPResponseDto,
  ResendOTPRequestDTO,
  OTPType,
  VerifyOTPResponse,
  VerifyOTPRequest,
  ActiveSubscriptionDto,
  PrivateDevicesDto,
  PhoneBookDTO,
  CreateContactRequest,
} from "./dto";
import { MarsolOtpResponse } from "./models/otp-response.model";
import { MarsolResendOtpResponse } from "./models/resend-otp-response.model";
import { validate as validUUID } from "uuid";
import { MarsolPhonebook } from "./models/marsol-phonebook.model";
/**
 * Marsol Client - خدمة مرسول
 * @export
 * @class MarsolClient
 *
 */
export class MarsolClient {
  private readonly publicApiUrl = "/public";
  private readonly client: Axios = new Axios();
  public apiToken: string | null = null;
  /**
   * Marsol Client - خدمة مرسول
   * @param {string} _apiToken - API Token - رمز الوصول الخاص بمرسول
   * @param {MarsolEnvironmentEnum} [environment=MarsolEnvironmentEnum.PRODUCTION] - Marsol Environment - النسخة الرئيسية أو التجريبية
   */
  constructor(_apiToken: string | null = null, private readonly environment: MarsolEnvironmentEnum = MarsolEnvironmentEnum.PRODUCTION) {
    this.client.defaults.baseURL = environment;
    this.apiToken = _apiToken;
    this.client.interceptors.request.use((config) => {
      if (this.apiToken) {
        config.headers["x-auth-token"] = this.apiToken;
      }
      return config;
    });
  }

  /**
   * إرسال رسالة نصية
   * @param {string} message نص الرسالة
   * @param {string[]} phoneNumbers أرقام المستلمين
   * @param {string} senderId رقم الجهاز المراد إستخدامه - في حالة توفر أجهزة خاصة بالمستخدم (إختياري)
   * @returns نتيجة عملية الإرسال
   */
  async sendSMSAsync(message: string, phoneNumbers: string[], senderId?: string): Promise<MessageResponseDto> {
    this.validateToken();

    if (!message) {
      throw new MarsolException("الرسالة مطلوبة");
    }

    if (!phoneNumbers || phoneNumbers.length === 0) {
      throw new MarsolException("Phone number is required");
    }

    const response = await this.client
      .post<any, MessageResponseDto, RequestDto>(`${this.publicApiUrl}/sms/send`, { message, phoneNumbers, senderId })
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });

    return response;
  }

  /***
   * إرسال رسالة نصية إلى دفتر جهات الإتصال
   * @param {string} message نص الرسالة
   * @param {string} phoneBookId رقم دفتر جهات الإتصال
   * @param {string} senderId رقم الجهاز المراد إستخدامه - في حالة توفر أجهزة خاصة بالمستخدم (إختياري)
   * @returns نتيجة عملية الإرسال
   */
  async sendSMSToPhoneBookAsync(
    message: string,
    phoneBookId: string,
    senderId: string | undefined = undefined
  ): Promise<MessageResponseDto> {
    this.validateToken();

    if (!message) {
      throw new MarsolException("Message is required");
    }

    if (!phoneBookId || !validUUID(phoneBookId)) {
      throw new MarsolException("Phonebook id is not valid");
    }

    const response = await this.client
      .post<any, MessageResponseDto, PhoneBookSMSRequestDto>(`${this.publicApiUrl}/sms/send-phonebook`, {
        message,
        phonebookId: phoneBookId,
        senderId,
      })
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });

    return response;
  }

  /**
   * التأكد من حالة خدمة مرسول
   * @returns حالة الخدمة
   */
  async checkServiceHealthAsync(): Promise<HealthResponse> {
    const response = await this.client.get<any, HealthResponse>(`/health`).catch((e: AxiosError<{ message: string }>) => {
      throw new MarsolException(e?.response?.data?.message ?? e.message);
    });

    return response;
  }

  /**
   * للحصول على معلومات إشتراك الحساب
   * @returns معلومات الإشتراك الحالي
   */
  async getActiveSubscription(): Promise<ActiveSubscriptionDto> {
    const response = await this.client
      .get<any, ActiveSubscriptionDto>(`${this.publicApiUrl}/subscription`)
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });
    return response;
  }

  /**
   * خدمة تأكيد أرقام الهواتف
   *
   * @param phoneNumber رقم الهاتف المراد التحقق منه
   * @param length طول كود التاكيد 4|6
   * @param language لغة رسالة التأكيد
   * @param os نظام تشغيل المستقبل
   * @param expiration صلاحية كود التأكيد 120|300|600 ثانية
   * @param operation نوع العملية رسالة نصية|مكالمة| مكالمة فلاش
   * @returns نتيجة التأكيد
   */
  async initiateOtpRequestAsync(
    phoneNumber: string,
    length: CodeLength = 4,
    language: Language = Language.AR,
    os: OS = OS.OTHER,
    expiration: OtpExpiration = OtpExpiration.FIVE_MIN,
    operation: OTPType = OTPType.CODE
  ): Promise<MarsolOtpResponse> {
    this.validateToken();

    if (!phoneNumber) {
      throw new MarsolException("رقم الهاتف مطلوب");
    }

    const response = await this.client
      .post<any, OtpResponse, NewOtpRequest>(`${this.publicApiUrl}/otp/initiate`, {
        phoneNumber,
        length,
        language,
        clientOs: os,
        expiration,
        operation,
      })
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });

    return new MarsolOtpResponse(response, this);
  }

  /**
   * إعادة إرسال رقم التأكيد, تفشل عملية إعادة الإرسال في حال تجاوز عدد محاولات إعادة الإرسال المسموح بها أو التأكد من إستلام الرقم للكود
   * @param requestId رقم طلب التأكيد
   * @param resendToken كود إعادة الإرسال
   * @param operation نوع العملية رسالة نصية|مكالمة| مكالمة فلاش
   * @returns تأكيد إعادة الإرسال
   */
  async resendOtpRequestAsync(requestId: string, resendToken: string, operation: OTPType = OTPType.CODE): Promise<MarsolResendOtpResponse> {
    this.validateToken();

    if (!requestId || !validUUID(requestId)) {
      throw new MarsolException("رقم العملية غير صحيح");
    }

    if (!resendToken) {
      throw new MarsolException("رمز إعادة الإرسال مطلوب");
    }

    const response = await this.client
      .post<any, ResendOTPResponseDto, ResendOTPRequestDTO>(`${this.publicApiUrl}/otp/resend`, {
        requestId,
        resendToken,
        operation,
      })
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });
    return new MarsolResendOtpResponse(response, this);
  }

  /**
   * تأكيد نهائي للطلب
   * @param requestId رقم طلب التأكيد
   * @param code كود التأكيد
   * @param operation العملية كود|مكالمة فلاش
   * @returns نتيجة التأكيد نجاح|فشل
   */
  async verifyOtpRequestAsync(
    requestId: string,
    code: string,
    operation: OTPType.CODE | OTPType.FLASH_CALL = OTPType.CODE
  ): Promise<VerifyOTPResponse> {
    this.validateToken();
    if (!requestId || !validUUID(requestId)) {
      throw new MarsolException("رقم العملية غير صحيح");
    }

    if (!code) {
      throw new MarsolException("الكود مطلوب");
    }

    const response = await this.client
      .post<any, VerifyOTPResponse, VerifyOTPRequest>(`${this.publicApiUrl}/otp/verify`, {
        code,
        requestId,
        operation,
      })
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });

    return response;
  }

  /**
   * طلب قائمة الأجهزة الخاصة بالحساب
   * @returns الأجهزة الخاصة بالمستخدم
   */
  async getPrivateDevices(): Promise<PrivateDevicesDto[]> {
    this.validateToken();
    const response = await this.client
      .get<any, PrivateDevicesDto[]>(`${this.publicApiUrl}/devices`)
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });

    return response;
  }

  /**
   * طلب جهات الإتصال الخاصة بالحساب
   * @returns دفاتر جهات الإتصال
   */
  async getPhoneBooks(): Promise<MarsolPhonebook[]> {
    this.validateToken();
    const response = await this.client
      .get<any, PhoneBookDTO[]>(`${this.publicApiUrl}/phonebooks`)
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });

    return response.map((p) => new MarsolPhonebook(p, this));
  }

  /**
   * إضافة رقم إلى دفتر جهات الإتصال
   * @param phoneBookId رقم دفتر جهات الإتصال
   * @param phoneNumber رقم الهاتف
   * @param name إسم الجهة إتصال
   */
  async addContactToPhoneBook(phoneBookId: string, phoneNumber: string, name?: string): Promise<void> {
    this.validateToken();
    if (!phoneBookId || !validUUID(phoneBookId)) {
      throw new MarsolException("رقم دفتر جهات الإتصال غير صحيح");
    }
    await this.client
      .post<any, void, CreateContactRequest>(`${this.publicApiUrl}/phonebooks/${phoneBookId}/contacts`, { phoneNumber, name })
      .catch((e: AxiosError<{ message: string }>) => {
        throw new MarsolException(e?.response?.data?.message ?? e.message);
      });
  }

  private validateToken(): void {
    if (!this.apiToken && this.apiToken == "") throw new MarsolException("API Token مطلوبه ");
  }
}

export enum MarsolEnvironmentEnum {
  PRODUCTION = "https://api.marsol.ly",
  STAGING = "https://staging.marsol.ly",
}
