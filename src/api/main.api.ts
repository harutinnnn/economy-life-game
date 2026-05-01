import api from "./axios";
import {CountryType, TimezoneType} from "@/types/country.type";


export type CountriesResponse = {
    countries: CountryType[]
}


export type TimezonesResponse = {
    timezones: TimezoneType[]
}


export async function countriesRequest(): Promise<CountryType[]> {
    const response = await api.get<CountriesResponse>("/main/countries");
    return response.data.countries;
}

export async function timezonesRequest(countryId: number): Promise<TimezoneType[]> {
    const response = await api.get<TimezonesResponse>("/main/timezones/" + countryId);
    return response.data.timezones;
}