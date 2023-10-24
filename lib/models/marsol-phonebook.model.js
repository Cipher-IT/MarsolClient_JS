"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsolPhonebook = void 0;
class MarsolPhonebook {
    /**
     *
     */
    constructor(phoneBook, client) {
        if (!phoneBook)
            throw new Error("Phonebook data is required");
        this.id = phoneBook.id;
        this.name = phoneBook.name;
        this.createdAt = phoneBook.createdAt;
        this.accountId = phoneBook.accountId;
        this.contactsCount = phoneBook.contactsCount;
        this.client = client;
    }
    addContactAsync(phoneNumber, name) {
        return this.client.addContactToPhoneBook(this.id, phoneNumber, name);
    }
    sendSMSAsync(message, senderId) {
        return this.client.sendSMSToPhoneBookAsync(message, this.id, senderId);
    }
}
exports.MarsolPhonebook = MarsolPhonebook;
