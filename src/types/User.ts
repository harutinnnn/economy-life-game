import {UserInfo} from "@/types/user.info.type";
import {UserProgressInfo} from "@/types/user.progress.info.type";

export type User = {
    user: {
        id: number;
        name: string;
        nickname: string;
        email: string;
        refreshToken: string;
        avatar: string;
        gender: 'male' | 'female' | 'unknown';
        gameMoney:number;
        realMoney:number;
    },
    userInfo: UserInfo,
    userProgressInfo: UserProgressInfo,
};
