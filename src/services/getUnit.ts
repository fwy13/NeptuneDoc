import { url } from "../constants";

const getUnit = async (unit: string) => {
    console.log("hello", unit)
    const data: {data: { WORD: string; MEANING: string}[][]} | { error: boolean; message: string }=
        await fetch(`${url}?unit=${unit}`).then((res) => res.json());
    return data;
};
export default getUnit;
