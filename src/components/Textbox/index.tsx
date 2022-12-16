import React, { ReactElement} from 'react'
import { Props } from './types';

const Textbox = (props: Props): ReactElement => {
    return (
        <input
            type={props.type}
            name={props.name}
            className={props.className}
            defaultValue={props.value}
            disabled = {props.disabled}
            onBlur={props.blur}
            onChange={props.change}
            placeholder={props.placeholder}
        ></input>
    )
}




export default Textbox
