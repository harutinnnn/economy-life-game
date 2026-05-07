import {UserGameLocations} from "@/enums/UserGameLocations";

export type UserInfo = {
    id: number;
    userId: number;
    countryId: number;
    timezoneId: number;
};
export type UserInfoCountry = {
    id: number;
    userId: number;
    countryId: number;
    timezoneId: number;
    countryCode: string;
    countryName: string;
    userGameLocation: UserGameLocations
};