import { MarsolClient } from "..";
import { MessageResponseDto, PhoneBookDTO } from "../dto";
export declare class MarsolPhonebook implements PhoneBookDTO {
    private readonly client;
    /**
     *
     */
    constructor(phoneBook: PhoneBookDTO, client: MarsolClient);
    id: string;
    name: string;
    createdAt: string;
    accountId: string;
    contactsCount: number;
    addContactAsync(phoneNumber: string, name?: string): Promise<void>;
    sendSMSAsync(message: string, senderId?: string): Promise<MessageResponseDto>;
}
