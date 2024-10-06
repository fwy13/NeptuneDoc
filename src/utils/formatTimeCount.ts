export default function formatTimeCount(count: number) {
    return `${formatNumber(count / 3600)}:${formatNumber(
        count / 60
    )}:${formatNumber(count % 60)}`;
}
export const formatNumber = (number: number) => {
    if (number < 10) {
        return `0${Math.floor(number)}`;
    } else {
        return `${Math.floor(number)}`;
    }
};
