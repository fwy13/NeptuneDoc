import { url } from "../constants";

const getUnit = async (unit: number) => {
    const data: {data: { WORD: string; MEANING: string}[][]} =
        await fetch(`${url}?unit=${unit}`).then((res) => res.json());
    return data.data;
};
export default getUnit;
