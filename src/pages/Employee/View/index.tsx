import React, { Dispatch, ReactElement, useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import {Label,Textbox,Button} from 'components'
import CustomForm from 'container'
import styles from './styles.scss'
import { employeeActions,employeeTypes } from 'store'
import {history,storageManager,joinClass} from 'helpers'

const View = (): ReactElement => {
    const dispatch: Dispatch<{
        id: string
        type: string
    }> = useDispatch()

    const id: string = useSelector(
        (state: RootStateOrAny) => state.employeeReducer.id || ''
    )

    useEffect(() => {
        const empId = storageManager.getValue('employeeId')
        if (empId) dispatch(employeeActions.GetEmployeeRequest(empId))
        return () => {
            storageManager.removeValue('employeeId')
        }
    }, [])

    useEffect(() => {
        if (id) {
            dispatch(employeeActions.GetEmployeeRequest(id))
            storageManager.saveValue('employeeId', id)
        }
    }, [id])

    const profileData: employeeTypes.EmployeeType = useSelector((state: RootStateOrAny) => {
        if (
            state.employeeReducer.detailsResp &&
            state.employeeReducer.detailsResp['doj'] &&
            state.employeeReducer.detailsResp['doj'].trim()
        ) {
            const obj = { ...state.employeeReducer.detailsResp }
            const dobDate =
                new Date(obj['dob']).getDate() > 9
                    ? new Date(obj['dob']).getDate()
                    : '0' + new Date(obj['dob']).getDate()
            const dobMonth =
                new Date(obj['dob']).getMonth() > 9
                    ? new Date(obj['dob']).getMonth() + 1
                    : '0' + (new Date(obj['dob']).getMonth() + 1)
            const dojDate =
                new Date(obj['doj']).getDate() > 9
                    ? new Date(obj['doj']).getDate()
                    : '0' + new Date(obj['doj']).getDate()
            const dojMonth =
                new Date(obj['doj']).getMonth() > 9
                    ? new Date(obj['doj']).getMonth() + 1
                    : '0' + (new Date(obj['doj']).getMonth() + 1)
            obj['dob'] =
                new Date(obj['dob']).getFullYear() +
                '-' +
                dobMonth +
                '-' +
                dobDate
            obj['doj'] =
                new Date(obj['doj']).getFullYear() +
                '-' +
                dojMonth +
                '-' +
                dojDate

            return obj
        }
        return {}
    })

    const navigate = (): void => {
        history.push('/list')
    }

    return (
        <>
            <div className={styles.cover}>
                <CustomForm className={styles['view-container']}>
                    <div
                        className={joinClass(
                            styles['view-header'],
                            styles.strongTxt
                        )}
                    >
                        VIEW
                    </div>
                    <div
                        className={joinClass(
                            styles['input-row'],
                            styles['top-30']
                        )}
                    >
                        <div className={styles.col}>
                            <Label
                                text="First Name"
                                className={joinClass(
                                    styles['label-txt'],
                                    styles.strongTxt
                                )}
                            ></Label>
                            <br />
                            <Textbox
                                name="firstname"
                                className={joinClass(
                                    styles['view-cstm-textbox'],
                                    styles['full-width']
                                )}
                                value={profileData['fname'] || ''}
                                disabled={true}
                            ></Textbox>
                        </div>
                        <div className={styles.col}>
                            <Label
                                text=" Last Name"
                                className={joinClass(
                                    styles['label-txt'],
                                    styles.strongTxt
                                )}
                            ></Label>
                            <br />
                            <Textbox
                                name="lastname"
                                className={joinClass(
                                    styles['view-cstm-textbox'],
                                    styles['full-width']
                                )}
                                value={profileData['lname'] || ''}
                                disabled={true}
                            ></Textbox>
                        </div>
                    </div>
                    <div
                        className={joinClass(
                            styles['input-row'],
                            styles['top-30']
                        )}
                    >
                        <div className={styles.col}>
                            <Label
                                text="Email address"
                                className={joinClass(
                                    styles['label-txt'],
                                    styles.strongTxt
                                )}
                            ></Label>
                            <br />
                            <Textbox
                                name="email"
                                className={joinClass(
                                    styles['view-cstm-textbox'],
                                    styles['full-width']
                                )}
                                value={profileData['email'] || ''}
                                disabled={true}
                            ></Textbox>
                        </div>
                        <div className={styles.col}>
                            <div className={styles.col}>
                                <Label
                                    text="Date of Birth"
                                    className={joinClass(
                                        styles['label-txt'],
                                        styles.strongTxt
                                    )}
                                ></Label>
                                <br />
                                <Textbox
                                    name="dob"
                                    type="text"
                                    className={joinClass(
                                        styles['view-cstm-textbox'],
                                        styles['size-80']
                                    )}
                                    value={profileData['dob'] || ''}
                                    disabled={true}
                                ></Textbox>
                            </div>
                            <div className={styles.col}>
                                <Label
                                    text="Date of Join"
                                    className={joinClass(
                                        styles['label-txt'],
                                        styles.strongTxt
                                    )}
                                ></Label>
                                <br />
                                <Textbox
                                    name="doj"
                                    type="text"
                                    className={joinClass(
                                        styles['view-cstm-textbox'],
                                        styles['size-80']
                                    )}
                                    value={profileData['doj'] || ''}
                                    disabled={true}
                                ></Textbox>
                            </div>
                        </div>
                    </div>
                    <div
                        className={joinClass(
                            styles['input-row'],
                            styles['top-30']
                        )}
                    >
                        <div className={styles.col}>
                            <Label
                                text="Designation"
                                className={joinClass(
                                    styles['label-txt'],
                                    styles.strongTxt
                                )}
                            ></Label>
                            <br />
                            <Textbox
                                name="desg"
                                className={joinClass(
                                    styles['view-cstm-textbox'],
                                    styles['full-width']
                                )}
                                value={profileData['designation'] || ''}
                                disabled={true}
                            ></Textbox>
                        </div>
                        <div className={styles.col}>
                            <div className={styles.col}>
                                <Label
                                    text="Experience(in yrs)"
                                    className={joinClass(
                                        styles['label-txt'],
                                        styles.strongTxt
                                    )}
                                ></Label>
                                <br />
                                <Textbox
                                    name="exp"
                                    className={joinClass(
                                        styles['view-cstm-textbox'],
                                        styles['size-80']
                                    )}
                                    value={profileData['experience'] || ''}
                                    disabled={true}
                                ></Textbox>
                            </div>
                            <div className={styles.col}>
                                <Label
                                    text="Phone"
                                    className={joinClass(
                                        styles['label-txt'],
                                        styles.strongTxt
                                    )}
                                ></Label>
                                <br />
                                <Textbox
                                    name="phone"
                                    className={joinClass(
                                        styles['view-cstm-textbox'],
                                        styles['size-80']
                                    )}
                                    value={profileData['phoneNumber'] || ''}
                                    disabled={true}
                                ></Textbox>
                            </div>
                        </div>
                    </div>
                    <div
                        className={joinClass(
                            styles['input-row'],
                            styles['top-40']
                        )}
                    >
                        <Button
                            type="button"
                            className={joinClass(
                                styles['view-cancel-btn'],
                                styles.strongtxt
                            )}
                            label="Back"
                            click={navigate}
                        ></Button>
                    </div>
                </CustomForm>
            </div>
        </>
    )
}

export default View
