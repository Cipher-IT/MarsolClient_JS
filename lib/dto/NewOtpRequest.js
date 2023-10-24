"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = exports.OtpExpiration = exports.OTPType = exports.OS = exports.CodeLength = void 0;
var CodeLength;
(function (CodeLength) {
    CodeLength[CodeLength["FOUR"] = 4] = "FOUR";
    CodeLength[CodeLength["SIX"] = 6] = "SIX";
})(CodeLength || (exports.CodeLength = CodeLength = {}));
var OS;
(function (OS) {
    OS["ANDROID"] = "ANDROID";
    OS["IOS"] = "IOS";
    OS["WEB"] = "WEB";
    OS["OTHER"] = "OTHER";
})(OS || (exports.OS = OS = {}));
var OTPType;
(function (OTPType) {
    OTPType["CODE"] = "CODE";
    OTPType["FLASH_CALL"] = "FLASH_CALL";
    OTPType["VOICE"] = "VOICE";
})(OTPType || (exports.OTPType = OTPType = {}));
var OtpExpiration;
(function (OtpExpiration) {
    OtpExpiration[OtpExpiration["TWO_MIN"] = 120] = "TWO_MIN";
    OtpExpiration[OtpExpiration["FIVE_MIN"] = 300] = "FIVE_MIN";
    OtpExpiration[OtpExpiration["TEN_MIN"] = 600] = "TEN_MIN";
})(OtpExpiration || (exports.OtpExpiration = OtpExpiration = {}));
var Language;
(function (Language) {
    Language["AR"] = "AR";
    Language["EN"] = "EN";
})(Language || (exports.Language = Language = {}));
