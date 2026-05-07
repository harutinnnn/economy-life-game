import api from "./axios";
import {UserGameLocations} from "@/enums/UserGameLocations";

export type UpdateUserInfoPayload = {
    countryId: number;
    timezoneId: number;
    userGameLocation:UserGameLocations;
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
