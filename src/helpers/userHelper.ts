export const BASE_XP = 100;
export const GROWTH = 2.25;


export const levelCalculation = (level: number): number => {

    return Math.floor(BASE_XP * Math.pow(level, GROWTH));
}

export const userUpToNextLvlByPercent = (level: number, xp: number): number => {
    return xp / levelCalculation(level) * 100;
}