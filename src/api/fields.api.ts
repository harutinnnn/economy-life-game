import api from "./axios";
import {FieldType} from "@/types/FieldType";
import {FieldTypeEnum} from "@/enums/FieldTypesEnum";
import {ErrorResponse} from "@/api/auth.api";

export type FieldsList = {
    fields: FieldType[];
};

export type SeedFieldPayload = {
    fieldId: number,
    seedType: FieldTypeEnum,
}


export async function updateUserInfoRequest(): Promise<FieldsList> {
    const response = await api.get<FieldsList>("/fields");
    return response.data;
}

export async function seedField(data: SeedFieldPayload): Promise<FieldsList | ErrorResponse> {
    const response = await api.post<FieldsList>("/fields/seed-field", data);
    return response.data;
}
