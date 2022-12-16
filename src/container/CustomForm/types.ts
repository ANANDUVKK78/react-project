import { FormEventHandler } from "react";

export type Props = {
    formSubmit?: FormEventHandler<HTMLFormElement>
    children: JSX.Element[] | JSX.Element,
    className: string
}
