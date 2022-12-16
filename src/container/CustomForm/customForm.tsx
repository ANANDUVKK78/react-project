import React, { ReactElement } from 'react'
import { Props } from './types'

const CustomForm = (props: Props): ReactElement => {
    return (
        <>
            <form className={props.className} onSubmit={props.formSubmit}>
                {props.children}
            </form>
        </>
    )
}


export default CustomForm
