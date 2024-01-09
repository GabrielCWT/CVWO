export const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minuteInSeconds = 60;
    const hourInSeconds = 3600;
    const dayInSeconds = 86400;
    const monthInSeconds = 2592000;
    const yearInSeconds = 31536000;
    let value: number;
    let unit: Intl.RelativeTimeFormatUnit;

    if (secondsAgo < minuteInSeconds) {
        return "just now";
    } else if (secondsAgo < hourInSeconds) {
        value = Math.floor(secondsAgo / minuteInSeconds);
        unit = "minutes";
    } else if (secondsAgo < dayInSeconds) {
        value = Math.floor(secondsAgo / hourInSeconds);
        unit = "hours";
    } else if (secondsAgo < monthInSeconds) {
        value = Math.floor(secondsAgo / dayInSeconds);
        unit = "days";
    } else if (secondsAgo < yearInSeconds) {
        value = Math.floor(secondsAgo / monthInSeconds);
        unit = "months";
    } else {
        value = Math.floor(secondsAgo / yearInSeconds);
        unit = "years";
    }

    return `${value} ${unit} ago`;
};
