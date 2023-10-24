/**
 *
 * @export
 * @interface NewOtpRequest
 */
export interface NewOtpRequest {
    phoneNumber: string;
    length?: CodeLength;
    expiration?: OtpExpiration;
    clientOs?: OS;
    language?: Language;
    operation?: OTPType;
}


export enum CodeLength {
    FOUR = 4,
    SIX = 6,
}

export enum OS {
    ANDROID = 'ANDROID',
    IOS = 'IOS',
    WEB = 'WEB',
    OTHER = 'OTHER',
}

export enum OTPType {
    CODE = 'CODE',
    FLASH_CALL = 'FLASH_CALL',
    VOICE = 'VOICE',
}

export enum OtpExpiration {
    TWO_MIN = 120,
    FIVE_MIN = 300,
    TEN_MIN = 600,
}

export enum Language {
    AR = 'AR',
    EN = 'EN',
}