import {UserInfo} from "@/types/user.info.type";

export type User = {
    user: {
        id: number;
        name: string;
        nickname: string;
        email: string;
        gender: 'male' | 'female' | 'unknown';
    },
    userInfo: UserInfo,
};
