import { url } from "../constants";

const getScoreBoard = async () => {
    const data: {
        scoreBoard: {
            Rank: string;
            Name: string;
            Score: number;
            Time: number;
            Unit: number
        }[][];
    } = await fetch(url).then((res) => res.json());
    return data;
};
export default getScoreBoard;
