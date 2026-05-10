import {parse} from "vite";

export const countDown = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffMs = end - start;

    if (diffMs <= 0) {
        return "Time is up!";
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    return {
        days,
        hours,
        minutes,
        seconds,
    };
}

export const startCountdown = (endDateString: string): string => {
    const now = new Date();
    const endDate = new Date(endDateString);

    const diff = endDate - now;


    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (diff > 0) {
        return `${days}d ${hours}h ${minutes}m ${seconds}s`
    } else {
        return `-`

    }
}


export const getDateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = Date.now();

    if (now <= start) return 0;
    if (now >= end) return 100;

    return parseInt(((now - start) / (end - start)) * 100);
}
