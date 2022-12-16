import React, { ReactElement } from 'react'
import { Props } from './types'

const Table = (props: Props): ReactElement => {
    return (
        <>
            <table  className={props.className} >
                {props.children}
            </table>
        </>
    )
}



export default Table
