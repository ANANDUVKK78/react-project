import { ChangeEventHandler } from "react";

export type Props = {
    type?:string,
    name?:string,
    className?:string,
    label?:string,
    value?:string,
    disabled?:boolean,
    placeholder?:string
    blur?:ChangeEventHandler<HTMLInputElement>
    change?:ChangeEventHandler<HTMLInputElement>
}
