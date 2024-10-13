import { uid } from "uid/secure";

export default function createUidUser() {
    const id = uid(6);
    return `nep-${id}`;
}
