export {};
declare global {

    interface String {
        isValidLocalNumber(): boolean;
    }
}

String.prototype.isValidLocalNumber = function (this: string): boolean {
    const localNumberRegex = /^09[1|2|3|4|5]\d{7}$/;
    return localNumberRegex.test(this);
};