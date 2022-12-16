import React, { ReactElement } from 'react'
import { Props } from './types'


const Label = (props:Props): ReactElement => {
    return <label className={props.className}>{props.text}</label>
}




export default Label
