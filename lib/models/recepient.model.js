"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.isValidLocalNumber = function () {
    const localNumberRegex = /^09[1|2|3|4|5]\d{7}$/;
    return localNumberRegex.test(this);
};
