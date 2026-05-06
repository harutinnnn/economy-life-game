export type CountryType = {
    id: number,
    name: string,
    capital: string,
    code: string,
}


export type TimezoneType = {
    id: number;
    countryId: number;
    timezoneName: string;
    utcOffset: string;
};

export type UsersByCountry = {
    country: string;
    value: number;
};

export type CountriesPayload = {
    email: string;
    password: string;
};