import React, { ReactElement } from 'react'
import {Props} from './types';

const Button = (props: Props): ReactElement => {
    return (
        <button
            type={props.type}
            className={props.className}
            disabled={props.disabled}
            onClick={props.click}
        >
            {props.label}
        </button>
    )
}



export default Button
