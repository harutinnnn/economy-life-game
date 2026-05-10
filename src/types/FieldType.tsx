import {FieldTypeEnum} from "@/enums/FieldTypesEnum";

export type FieldType = {
    id: number;
    title: string;
    type: FieldTypeEnum;
    status: string,
    startProgressTime:Date | string;
    endProgressTime:Date | string;
    durationBySeconds: number;
}