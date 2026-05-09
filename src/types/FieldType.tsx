import {FieldTypeEnum} from "@/enums/FieldTypesEnum";

export type FieldType = {
    id: number;
    title: string;
    type: FieldTypeEnum;
    status: number,
    remaining: number;
}