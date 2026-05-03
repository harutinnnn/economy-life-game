import {UserInfo} from "@/types/user.info.type";
import {UserProgressInfo} from "@/types/user.progress.info.type";
import {UserRoles} from "@/enums/UserRoles";

export type User = {
    user: {
        id: number;
        name: string;
        nickname: string;
        email: string;
        refreshToken: string;
        avatar: string;
        gender: 'male' | 'female' | 'unknown';
        gameMoney: number;
        realMoney: number;
        role: UserRoles;
    },
    userInfo: UserInfo,
    userProgressInfo: UserProgressInfo,
};
