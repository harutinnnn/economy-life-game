import api from "./axios";
import {FieldType} from "@/types/FieldType";

export type FieldsList = {
    fields: FieldType[];
};


export async function updateUserInfoRequest(): Promise<FieldsList> {
    const response = await api.get<FieldsList>("/fields");
    return response.data;
}
