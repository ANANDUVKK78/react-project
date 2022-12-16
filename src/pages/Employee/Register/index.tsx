import React, {
    ChangeEvent,
    Dispatch,
    FormEvent,
    useState,
    useEffect,
    ReactElement,
} from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Label, Textbox, Button } from 'components'
import CustomForm from 'container'
import styles from './styles.scss'
import { employeeActions, employeeTypes } from 'store'
import { history,storageManager,joinClass } from 'helpers'
import { useForm, validateEmployeeForm } from 'hooks'
import { RespType } from 'types'

const Register = (): ReactElement => {
    const firstNameErrText: string = 'Invalid First Name'
    const lastNameErrText: string = 'Invalid Last Name'
    const emailErrorText: string = 'Invalid Email'
    const phoneErrText: string = `Invalid phone number`
    const desgErrText: string = `Invalid designation`
    const expErrText: string = 'Invalid experience data'
    const dateErrorText: string = 'Invalid date'

    const response: { success?: boolean; message?: string } = useSelector(
        (state: RootStateOrAny) => {
            const resp: RespType = Object.keys(state.employeeReducer.regResp)[0]
                ? state.employeeReducer.regResp
                : Object.keys(state.employeeReducer.editResp)[0]
                ? state.employeeReducer.editResp
                : { message: '' }
            return resp
        }
    )

    const isEdit: { edit?: boolean; id?: string } = useSelector(
        (state: RootStateOrAny) => state.employeeReducer.data || {}
    )

    const dispatch: Dispatch<employeeTypes.RegisterEmployeeActionType> = useDispatch()

    const profileData: employeeTypes.EmployeeType = useSelector(
        (state: RootStateOrAny) => {
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
        }
    )

    useEffect(() => {
        const empId = storageManager.getValue('employeeId')
        if (empId) dispatch(employeeActions.GetEmployeeRequest(empId))
        return () => {
            storageManager.removeValue('employeeId')
        }
    }, [])

    useEffect(() => {
        if (isEdit.edit) {
            dispatch(employeeActions.GetEmployeeRequest(isEdit.id))
            storageManager.saveValue('employeeId', isEdit.id)
        }
    }, [isEdit])

    const [restart, setRestart] = useState<boolean>(false)

    const { handleChange, state, validationState } = useForm(
        validateEmployeeForm,
        {
            flags: {
                firstnameTouched: false,
                lastnameTouched: false,
                emailTouched: false,
                phoneTouched: false,
                desgTouched: false,
                dobTouched: false,
                dojTouched: false,
                expTouched: false,
            },
            errors: {
                firstnameErr: false,
                lastnameErr: false,
                emailErr: false,
                phoneErr: false,
                desgErr: false,
                dobErr: false,
                dojErr: false,
                expErr: false,
            },
        },
        profileData.fname
            ? {
                  firstname: profileData.fname || '',
                  lastname: profileData.lname || '',
                  email: profileData.email || '',
                  desg: profileData.designation || '',
                  dob: profileData.dob || '',
                  doj: profileData.doj || '',
                  exp: profileData.experience || '',
                  phone: profileData.phoneNumber || '',
              }
            : {}
    )

    const registerEmployee = (event: FormEvent): void => {
        event.preventDefault()
        dispatch(employeeActions.ClearEmployeeResp())

        const data = {
            employeeId: state.employeeId || profileData.employeeId,
            fname: state.firstname || profileData.fname,
            lname: state.lastname || profileData.lname,
            email: state.email || profileData.email,
            dob: state.dob || profileData.dob,
            doj: state.doj || profileData.doj,
            designation: state.desg || profileData.designation,
            experience: state.exp || profileData.experience,
            phoneNumber: state.phone || profileData.phoneNumber,
        }

        if (isEdit.edit) dispatch(employeeActions.UpdateEmployeeRequest(data))
        else dispatch(employeeActions.RegisterEmployeeRequest(data))

        setRestart(false)
    }

    const navigate = (): void => {
        history.push('/list')
    }

    return (
        <>
            <div className={styles.cover}>
                <CustomForm
                    formSubmit={(e) => {
                        e.preventDefault()
                        registerEmployee(e)
                    }}
                    className={styles['reg-container']}
                >
                    <div
                        className={joinClass(
                            styles['reg-header'],
                            styles.strongTxt
                        )}
                    >
                        {isEdit.edit ? 'EDIT' : 'REGISTER'}
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
                                    styles['cstm-textbox'],
                                    styles['full-width']
                                )}
                                value={profileData['fname'] || ''}
                                change={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setRestart(true)
                                    handleChange(event)
                                }}
                                blur={handleChange}
                            ></Textbox>
                            {validationState.errors.firstnameErr && (
                                <p className={styles.errtxt}>
                                    {firstNameErrText}
                                </p>
                            )}
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
                                    styles['cstm-textbox'],
                                    styles['full-width']
                                )}
                                value={profileData['lname'] || ''}
                                change={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setRestart(true)
                                    handleChange(event)
                                }}
                                blur={handleChange}
                            ></Textbox>
                            {validationState.errors.lastnameErr && (
                                <p className={styles.errtxt}>
                                    {lastNameErrText}
                                </p>
                            )}
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
                                    styles['cstm-textbox'],
                                    styles['full-width']
                                )}
                                value={profileData['email'] || ''}
                                change={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setRestart(true)
                                    handleChange(event)
                                }}
                                blur={handleChange}
                            ></Textbox>
                            {validationState.errors.emailErr && (
                                <p className={styles.errtxt}>
                                    {emailErrorText}
                                </p>
                            )}
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
                                    type="date"
                                    className={joinClass(
                                        styles['cstm-textbox'],
                                        styles['size-80']
                                    )}
                                    value={profileData['dob'] || ''}
                                    change={(
                                        event: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setRestart(true)
                                        handleChange(event)
                                    }}
                                    blur={handleChange}
                                ></Textbox>
                                {validationState.errors.dobErr && (
                                    <p className={styles.errtxt}>
                                        {dateErrorText}
                                    </p>
                                )}
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
                                    type="date"
                                    className={joinClass(
                                        styles['cstm-textbox'],
                                        styles['size-80']
                                    )}
                                    value={profileData['doj'] || ''}
                                    change={(
                                        event: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setRestart(true)
                                        handleChange(event)
                                    }}
                                    blur={handleChange}
                                ></Textbox>
                                {validationState.errors.dojErr && (
                                    <p className={styles.errtxt}>
                                        {dateErrorText}
                                    </p>
                                )}
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
                                    styles['cstm-textbox'],
                                    styles['full-width']
                                )}
                                value={profileData['designation'] || ''}
                                change={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setRestart(true)
                                    handleChange(event)
                                }}
                                blur={handleChange}
                            ></Textbox>
                            {validationState.errors.desgErr && (
                                <p className={styles.errtxt}>{desgErrText}</p>
                            )}
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
                                        styles['cstm-textbox'],
                                        styles['size-80']
                                    )}
                                    value={profileData['experience'] || ''}
                                    change={(
                                        event: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setRestart(true)
                                        handleChange(event)
                                    }}
                                    blur={handleChange}
                                ></Textbox>
                                {validationState.errors.expErr && (
                                    <p className={styles.errtxt}>
                                        {expErrText}
                                    </p>
                                )}
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
                                        styles['cstm-textbox'],
                                        styles['size-80']
                                    )}
                                    value={profileData['phoneNumber'] || ''}
                                    change={(
                                        event: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setRestart(true)
                                        handleChange(event)
                                    }}
                                    blur={handleChange}
                                ></Textbox>
                                {validationState.errors.phoneErr && (
                                    <p className={styles.errtxt}>
                                        {phoneErrText}
                                    </p>
                                )}
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
                            type="submit"
                            className={joinClass(
                                styles['reg-btn'],
                                styles.strongtxt
                            )}
                            label={isEdit.edit ? 'Edit' : 'Register'}
                            disabled={
                                (Object.keys(profileData).length == 0 &&
                                    Object.values(
                                        validationState.flags
                                    ).indexOf(false) > -1) ||
                                Object.values(validationState.errors).indexOf(
                                    true
                                ) > -1
                            }
                        ></Button>

                        <Button
                            type="button"
                            className={joinClass(
                                styles['cancel-btn'],
                                styles.strongtxt
                            )}
                            label="Cancel"
                            click={navigate}
                        ></Button>
                    </div>
                    {!restart && (
                        <p className={styles.errtxt}>{response.message}</p>
                    )}
                </CustomForm>
            </div>
        </>
    )
}

export default Register
