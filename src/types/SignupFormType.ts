import {GenderEnum} from "@/enums/GenderEnum";

export type SignupFormType = {
    name: string;
    nickname: string;
    email: string;
    gender: GenderEnum;
    password: string;
    confirmPassword: string;
};