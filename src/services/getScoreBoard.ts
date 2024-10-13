import { url } from "../constants";
import compareByScoreAndTime from "../utils/compareByScoreAndTime";

const getScoreBoard = async () => {
    const data: {
        scoreBoard: {
            Id: string;
            Name: string;
            Score: number;
            Time: number;
            Unit: number;
        }[][];
    } = await fetch(`${url}?unit=scoreBoard`).then((res) => res.json());
    return data.scoreBoard[0].sort(compareByScoreAndTime);
};
export default getScoreBoard;
