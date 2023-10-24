"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsolEnvironmentEnum = exports.MarsolClient = void 0;
const axios_1 = require("axios");
const marsol_exception_1 = require("./exceptions/marsol.exception");
const dto_1 = require("./dto");
const otp_response_model_1 = require("./models/otp-response.model");
const resend_otp_response_model_1 = require("./models/resend-otp-response.model");
const uuid_1 = require("uuid");
const marsol_phonebook_model_1 = require("./models/marsol-phonebook.model");
/**
 * Marsol Client - خدمة مرسول
 * @export
 * @class MarsolClient
 *
 */
class MarsolClient {
    /**
     * Marsol Client - خدمة مرسول
     * @param {string} _apiToken - API Token - رمز الوصول الخاص بمرسول
     * @param {MarsolEnvironmentEnum} [environment=MarsolEnvironmentEnum.PRODUCTION] - Marsol Environment - النسخة الرئيسية أو التجريبية
     */
    constructor(_apiToken = null, environment = MarsolEnvironmentEnum.PRODUCTION) {
        this.environment = environment;
        this.publicApiUrl = "/public";
        this.client = new axios_1.Axios();
        this.apiToken = null;
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
    sendSMSAsync(message, phoneNumbers, senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateToken();
            if (!message) {
                throw new marsol_exception_1.MarsolException("الرسالة مطلوبة");
            }
            if (!phoneNumbers || phoneNumbers.length === 0) {
                throw new marsol_exception_1.MarsolException("Phone number is required");
            }
            const response = yield this.client
                .post(`${this.publicApiUrl}/sms/send`, { message, phoneNumbers, senderId })
                .catch((e) => {
                var _a, _b, _c;
                throw new marsol_exception_1.MarsolException((_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : e.message);
            });
            return response;
        });
    }
    /***
     * إرسال رسالة نصية إلى دفتر جهات الإتصال
     * @param {string} message نص الرسالة
     * @param {string} phoneBookId رقم دفتر جهات الإتصال
     * @param {string} senderId رقم الجهاز المراد إستخدامه - في حالة توفر أجهزة خاصة بالمستخدم (إختياري)
     * @returns نتيجة عملية الإرسال
     */
    sendSMSToPhoneBookAsync(message, phoneBookId, senderId = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateToken();
            if (!message) {
                throw new marsol_exception_1.MarsolException("Message is required");
            }
            if (!phoneBookId || !(0, uuid_1.validate)(phoneBookId)) {
                throw new marsol_exception_1.MarsolException("Phonebook id is not valid");
            }
            const response = yield this.client
                .post(`${this.publicApiUrl}/sms/send-phonebook`, {
                message,
                phonebookId: phoneBookId,
                senderId,
            })
                .catch((e) => {
                var _a, _b, _c;
                throw new marsol_exception_1.MarsolException((_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : e.message);
            });
            return response;
        });
    }
    /**
     * التأكد من حالة خدمة مرسول
     * @returns حالة الخدمة
     */
    checkServiceHealthAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.get(`/health`).catch((e) => {
                var _a, _b, _c;
                throw new marsol_exception_1.MarsolException((_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : e.message);
            });
            return response;
        });
    }
    /**
     * للحصول على معلومات إشتراك الحساب
     * @returns معلومات الإشتراك الحالي
     */
    getActiveSubscription() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client
                .get(`${this.publicApiUrl}/subscription`)
                .catch((e) => {
                var _a, _b, _c;
                throw new marsol_exception_1.MarsolException((_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : e.message);
            });
            return response;
        });
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
    initiateOtpRequestAsync(phoneNumber, length = 4, language = dto_1.Language.AR, os = dto_1.OS.OTHER, expiration = dto_1.OtpExpiration.FIVE_MIN, operation = dto_1.OTPType.CODE) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateToken();
            if (!phoneNumber) {
                throw new marsol_exception_1.MarsolException("رقم الهاتف مطلوب");
            }
            const response = yield this.client
                .post(`${this.publicApiUrl}/otp/initiate`, {
                phoneNumber,
                length,
                language,
                clientOs: os,
                expiration,
                operation,
            })
                .catch((e) => {
                var _a, _b, _c;
                throw new marsol_exception_1.MarsolException((_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : e.message);
            });
            return new otp_response_model_1.MarsolOtpResponse(response, this);
        });
    }
    /**
     * إعادة إرسال رقم التأكيد, تفشل عملية إعادة الإرسال في حال تجاوز عدد محاولات إعادة الإرسال المسموح بها أو التأكد من إستلام الرقم للكود
     * @param requestId رقم طلب التأكيد
     * @param resendToken كود إعادة الإرسال
     * @param operation نوع العملية رسالة نصية|مكالمة| مكالمة فلاش
     * @returns تأكيد إعادة الإرسال
     */
    resendOtpRequestAsync(requestId, resendToken, operation = dto_1.OTPType.CODE) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateToken();
            if (!requestId || !(0, uuid_1.validate)(requestId)) {
                throw new marsol_exception_1.MarsolException("رقم العملية غير صحيح");
            }
            if (!resendToken) {
                throw new marsol_exception_1.MarsolException("رمز إعادة الإرسال مطلوب");
            }
            const response = yield this.client
                .post(`${this.publicApiUrl}/otp/resend`, {
                requestId,
                resendToken,
                operation,
            })
                .catch((e) => {
                var _a, _b, _c;
                throw new marsol_exception_1.MarsolException((_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : e.message);
            });
            return new resend_otp_response_model_1.MarsolResendOtpResponse(response, this);
        });
    }
    /**
     * تأكيد نهائي للطلب
     * @param requestId رقم طلب التأكيد
     * @param code كود التأكيد
     * @param operation العملية كود|مكالمة فلاش
     * @returns نتيجة التأكيد نجاح|فشل
     */
    verifyOtpRequestAsync(requestId, code, operation = dto_1.OTPType.CODE) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateToken();
            if (!requestId || !(0, uuid_1.validate)(requestId)) {
                throw new marsol_exception_1.MarsolException("رقم العملية غير صحيح");
            }
            if (!code) {
                throw new marsol_exception_1.MarsolException("الكود مطلوب");
            }
            const response = yield this.client
                .post(`${this.publicApiUrl}/otp/verify`, {
                code,
                requestId,
                operation,
            })
                .catch((e) => {
                var _a, _b, _c;
                throw new marsol_exception_1.MarsolException((_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : e.message);
            });
            return response;
        });
    }
    /**
     * طلب قائمة الأجهزة الخاصة بالحساب
     * @returns الأجهزة الخاصة بالمستخدم
     */
    getPrivateDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateToken();
            const response = yield this.client
                .get(`${this.publicApiUrl}/devices`)
                .catch((e) => {
                var _a, _b, _c;
                throw new marsol_exception_1.MarsolException((_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : e.message);
            });
            return response;
        });
    }
    /**
     * طلب جهات الإتصال الخاصة بالحساب
     * @returns دفاتر جهات الإتصال
     */
    getPhoneBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateToken();
            const response = yield this.client
                .get(`${this.publicApiUrl}/phonebooks`)
                .catch((e) => {
                var _a, _b, _c;
                throw new marsol_exception_1.MarsolException((_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : e.message);
            });
            return response.map((p) => new marsol_phonebook_model_1.MarsolPhonebook(p, this));
        });
    }
    /**
     * إضافة رقم إلى دفتر جهات الإتصال
     * @param phoneBookId رقم دفتر جهات الإتصال
     * @param phoneNumber رقم الهاتف
     * @param name إسم الجهة إتصال
     */
    addContactToPhoneBook(phoneBookId, phoneNumber, name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateToken();
            if (!phoneBookId || !(0, uuid_1.validate)(phoneBookId)) {
                throw new marsol_exception_1.MarsolException("رقم دفتر جهات الإتصال غير صحيح");
            }
            yield this.client
                .post(`${this.publicApiUrl}/phonebooks/${phoneBookId}/contacts`, { phoneNumber, name })
                .catch((e) => {
                var _a, _b, _c;
                throw new marsol_exception_1.MarsolException((_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : e.message);
            });
        });
    }
    validateToken() {
        if (!this.apiToken && this.apiToken == "")
            throw new marsol_exception_1.MarsolException("API Token مطلوبه ");
    }
}
exports.MarsolClient = MarsolClient;
var MarsolEnvironmentEnum;
(function (MarsolEnvironmentEnum) {
    MarsolEnvironmentEnum["PRODUCTION"] = "https://api.marsol.ly";
    MarsolEnvironmentEnum["STAGING"] = "https://staging.marsol.ly";
})(MarsolEnvironmentEnum || (exports.MarsolEnvironmentEnum = MarsolEnvironmentEnum = {}));
