import { IUser } from "@/infrastructure/interfaces/user.interface";

export interface GetUserByPhoneResponse {
    status: string;
    data: IUser[];
    message: string;
}