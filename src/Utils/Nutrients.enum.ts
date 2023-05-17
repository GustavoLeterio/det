import { Nutrients } from "../Store/Slices/Home/IHome";

export function valueToKey(value:string):string{
    //@ts-ignore
    return Object.keys(Nutrients)[Object.values(Nutrients).indexOf(value)]
}
