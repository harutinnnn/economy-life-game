import api from "./axios";
import {User} from "@/types/User";

export type UpdateUserInfoPayload = {
    countryId: number;
    timezoneId: number;
};

export type UpdateUserInfoResponse = {
    success: boolean;
};


export async function updateUserInfoRequest(
    data: UpdateUserInfoPayload
): Promise<UpdateUserInfoResponse> {
    const response = await api.post<UpdateUserInfoResponse>("/users/update-user-info", data);
    return response.data;
}