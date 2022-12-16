import React, { ReactElement} from 'react';
import styles from './styles.scss'

const Toaster = (): ReactElement => {
    return (
       <div className ={styles.toasterContainer}>
           Internal server error
       </div>
    )
}




export default Toaster
