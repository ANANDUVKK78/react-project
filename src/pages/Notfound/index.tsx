import React, { ReactElement } from 'react'
import styles from './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const Notfound = (): ReactElement => {
    return (
        <div className={styles['notfound-cover']}>
            <div className={styles['notfound-container']}>
                <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className={styles['cstm-exclamation']}
                    size="10x"
                ></FontAwesomeIcon>
                <h1 className={styles['not-found-text']}>
                    Oops!
                    <br />
                    Something went wrong.
                </h1>
            </div>
        </div>
    )
}

export default Notfound
