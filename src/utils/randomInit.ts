export default function getRandomInt(min: number, max: number) {
    return min + Math.floor(Math.random() * (1 + max - min));
}
