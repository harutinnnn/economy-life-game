import api from "./axios";
import {CountryType, TimezoneType} from "@/types/country.type";
import {DataItem} from "react-svg-worldmap";


export type CountriesResponse = {
    countries: CountryType[]
}


export type TimezonesResponse = {
    timezones: TimezoneType[]
}

export type UsersByCountryResponse = {
    countries: DataItem[]
}


export async function countriesRequest(): Promise<CountryType[]> {
    const response = await api.get<CountriesResponse>("/main/countries");
    return response.data.countries;
}

export async function timezonesRequest(countryId: number): Promise<TimezoneType[]> {
    const response = await api.get<TimezonesResponse>("/main/timezones/" + countryId);
    return response.data.timezones;
}


export async function usersByCountry(): Promise<DataItem[]> {
    const response = await api.get<UsersByCountryResponse>("/main/users-by-country");
    return response.data.countries;
}