import { url } from "../constants";


const getAllUnit = async() => {
    const data: {allUnit: string[]} = await fetch(`${url}?unit=all`).then(res => res.json());
    return data
}
export default getAllUnit;