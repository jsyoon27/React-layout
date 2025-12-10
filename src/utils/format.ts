import dayjs from 'dayjs';

export const formatNumber = (value?: number | string | null) => {
    if (value === undefined || value === null) {
        return '';
    }
    const num = typeof value === "string" ? Number(value) : value;
    if (Number.isNaN(num)) {
        return '';
    }
    return num.toLocaleString();
};

export const formatDate = (date: string, format?: string) => {
    return dayjs(date).format(format ? format : 'YYYY.MM.DD');
};
