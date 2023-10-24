import { MarsolClient } from "..";
import { MessageResponseDto, PhoneBookDTO } from "../dto";

export class MarsolPhonebook implements PhoneBookDTO {
    private readonly client: MarsolClient;
    /**
     *
     */
    constructor(phoneBook: PhoneBookDTO, client: MarsolClient) {
        if(!phoneBook) throw new Error("Phonebook data is required");
        this.id = phoneBook.id;
        this.name = phoneBook.name;
        this.createdAt = phoneBook.createdAt;
        this.accountId = phoneBook.accountId;
        this.contactsCount = phoneBook.contactsCount;
        this.client = client;
    }
    id: string;
    name: string;
    createdAt: string;
    accountId: string;
    contactsCount: number;

    addContactAsync(phoneNumber: string, name?: string): Promise<void> {
        return this.client.addContactToPhoneBook(this.id, phoneNumber, name)
    }

    sendSMSAsync(message: string, senderId?: string): Promise<MessageResponseDto> {
        return this.client.sendSMSToPhoneBookAsync(message, this.id, senderId);
    }

}