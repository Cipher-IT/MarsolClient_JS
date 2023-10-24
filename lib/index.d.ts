import { MessageResponseDto, HealthResponse, OS, CodeLength, Language, OtpExpiration, OTPType, VerifyOTPResponse, ActiveSubscriptionDto, PrivateDevicesDto } from "./dto";
import { MarsolOtpResponse } from "./models/otp-response.model";
import { MarsolResendOtpResponse } from "./models/resend-otp-response.model";
import { MarsolPhonebook } from "./models/marsol-phonebook.model";
/**
 * Marsol Client - خدمة مرسول
 * @export
 * @class MarsolClient
 *
 */
export declare class MarsolClient {
    private readonly environment;
    private readonly publicApiUrl;
    private readonly client;
    apiToken: string | null;
    /**
     * Marsol Client - خدمة مرسول
     * @param {string} _apiToken - API Token - رمز الوصول الخاص بمرسول
     * @param {MarsolEnvironmentEnum} [environment=MarsolEnvironmentEnum.PRODUCTION] - Marsol Environment - النسخة الرئيسية أو التجريبية
     */
    constructor(_apiToken?: string | null, environment?: MarsolEnvironmentEnum);
    /**
     * إرسال رسالة نصية
     * @param {string} message نص الرسالة
     * @param {string[]} phoneNumbers أرقام المستلمين
     * @param {string} senderId رقم الجهاز المراد إستخدامه - في حالة توفر أجهزة خاصة بالمستخدم (إختياري)
     * @returns نتيجة عملية الإرسال
     */
    sendSMSAsync(message: string, phoneNumbers: string[], senderId?: string): Promise<MessageResponseDto>;
    /***
     * إرسال رسالة نصية إلى دفتر جهات الإتصال
     * @param {string} message نص الرسالة
     * @param {string} phoneBookId رقم دفتر جهات الإتصال
     * @param {string} senderId رقم الجهاز المراد إستخدامه - في حالة توفر أجهزة خاصة بالمستخدم (إختياري)
     * @returns نتيجة عملية الإرسال
     */
    sendSMSToPhoneBookAsync(message: string, phoneBookId: string, senderId?: string | undefined): Promise<MessageResponseDto>;
    /**
     * التأكد من حالة خدمة مرسول
     * @returns حالة الخدمة
     */
    checkServiceHealthAsync(): Promise<HealthResponse>;
    /**
     * للحصول على معلومات إشتراك الحساب
     * @returns معلومات الإشتراك الحالي
     */
    getActiveSubscription(): Promise<ActiveSubscriptionDto>;
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
    initiateOtpRequestAsync(phoneNumber: string, length?: CodeLength, language?: Language, os?: OS, expiration?: OtpExpiration, operation?: OTPType): Promise<MarsolOtpResponse>;
    /**
     * إعادة إرسال رقم التأكيد, تفشل عملية إعادة الإرسال في حال تجاوز عدد محاولات إعادة الإرسال المسموح بها أو التأكد من إستلام الرقم للكود
     * @param requestId رقم طلب التأكيد
     * @param resendToken كود إعادة الإرسال
     * @param operation نوع العملية رسالة نصية|مكالمة| مكالمة فلاش
     * @returns تأكيد إعادة الإرسال
     */
    resendOtpRequestAsync(requestId: string, resendToken: string, operation?: OTPType): Promise<MarsolResendOtpResponse>;
    /**
     * تأكيد نهائي للطلب
     * @param requestId رقم طلب التأكيد
     * @param code كود التأكيد
     * @param operation العملية كود|مكالمة فلاش
     * @returns نتيجة التأكيد نجاح|فشل
     */
    verifyOtpRequestAsync(requestId: string, code: string, operation?: OTPType.CODE | OTPType.FLASH_CALL): Promise<VerifyOTPResponse>;
    /**
     * طلب قائمة الأجهزة الخاصة بالحساب
     * @returns الأجهزة الخاصة بالمستخدم
     */
    getPrivateDevices(): Promise<PrivateDevicesDto[]>;
    /**
     * طلب جهات الإتصال الخاصة بالحساب
     * @returns دفاتر جهات الإتصال
     */
    getPhoneBooks(): Promise<MarsolPhonebook[]>;
    /**
     * إضافة رقم إلى دفتر جهات الإتصال
     * @param phoneBookId رقم دفتر جهات الإتصال
     * @param phoneNumber رقم الهاتف
     * @param name إسم الجهة إتصال
     */
    addContactToPhoneBook(phoneBookId: string, phoneNumber: string, name?: string): Promise<void>;
    private validateToken;
}
export declare enum MarsolEnvironmentEnum {
    PRODUCTION = "https://api.marsol.ly",
    STAGING = "https://staging.marsol.ly"
}
