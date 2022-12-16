import React, {
    ChangeEvent,
    Dispatch,
    FormEvent,
    ReactElement,
    useState,
} from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Label, Textbox, Button } from 'components'
import CustomForm from 'container'
import styles from './styles.scss'
import { joinClass, history } from 'helpers'
import { userActions, userTypes } from 'store'
import { useForm, validateSignupForm } from 'hooks'

const Signup = (): ReactElement => {
    const emailErrorText: string = 'Invalid Email id'
    const emptyText: string = 'This field is required'
    const passwordMismatchText: string = `The two passwords doesn't match`

    const response: { success?: boolean; message?: string } = useSelector(
        (state: RootStateOrAny) =>
            state.userReducer.signupResp || { message: '' }
    )
    const dispatch: Dispatch<userTypes.RegisterUserActionType> = useDispatch()

    const [restart, setRestart] = useState<boolean>(false)

    const { handleChange, state, validationState } = useForm(
        validateSignupForm,
        {
            errors: {
                emailErr: false,
                passwordEmptyErr: false,
                cpasswordEmptyErr: false,
                mismatchErr: false,
            },
            flags: {
                emailTouched: false,
                passwordTouched: false,
                cpasswordTouched: false,
            },
        }
    )

    const registerUser = (): void => {
        dispatch(userActions.ClearResponse())

        const data = {
            email: state.email,
            password: state.password,
        }
        dispatch(userActions.RegisterUserRequest(data))
        setRestart(false)
    }

    return (
        <>
            <div className={styles.cover}>
                <div className={styles['signup-container']}>
                    <div className={styles['signup-info-bar']}>
                        <h1 className={styles['signup-info-header']}>
                            INFORMATION
                        </h1>
                        <div className={styles['signup-info-txt']}>
                            This is a typical auth session for default values
                            and checks made.Also winding of,with barb wire and
                            blue whale games. All should take extreme
                            precautions when signing the deal.This is a•• deal
                            of lifetime.Happy surviving.
                        </div>
                        <Button
                            type="button"
                            className={joinClass(
                                styles['login-nav-btn'],
                                styles.strongtxt
                            )}
                            label="Have an Account"
                            click={() => {
                                history.push('/login')
                            }}
                        ></Button>
                    </div>
                    <CustomForm
                        className={styles['signup-form']}
                        formSubmit={(e: FormEvent) => {
                            e.preventDefault()
                            registerUser()
                        }}
                    >
                        <div className={styles.registerheader}>
                            <div
                                className={joinClass(
                                    styles.signupText,
                                    styles.strongtxt
                                )}
                            >
                                REGISTER FORM
                            </div>
                        </div>

                        <div className={styles['top-30']}>
                            <Label
                                text="Email"
                                className={joinClass(
                                    styles.customLabel,
                                    styles.strongtxt
                                )}
                            ></Label>
                            <br />
                            <Textbox
                                className={styles['custom-textbox']}
                                type="email"
                                name="email"
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

                        <div className={styles['top-30']}>
                            <Label
                                text="Password"
                                className={joinClass(
                                    styles.customLabel,
                                    styles.strongtxt
                                )}
                            ></Label>
                            <br />
                            <Textbox
                                className={styles['custom-textbox']}
                                type="password"
                                name="password"
                                change={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setRestart(true)
                                    handleChange(event)
                                }}
                                blur={handleChange}
                            ></Textbox>
                            {validationState.errors.passwordEmptyErr && (
                                <p className={styles.errtxt}>{emptyText}</p>
                            )}
                        </div>

                        <div className={styles['top-30']}>
                            <Label
                                text="Confirm Password"
                                className={joinClass(
                                    styles.customLabel,
                                    styles.strongtxt
                                )}
                            ></Label>
                            <br />
                            <Textbox
                                className={styles['custom-textbox']}
                                type="password"
                                name="cpassword"
                                change={handleChange}
                                blur={handleChange}
                            ></Textbox>
                            {validationState.errors.cpasswordEmptyErr && (
                                <p className={styles.errtxt}>{emptyText}</p>
                            )}
                            {validationState.errors.mismatchErr && (
                                <p className={styles.errtxt}>
                                    {passwordMismatchText}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className={joinClass(
                                styles['signup-btn'],
                                styles.strongtxt
                            )}
                            label="Signup"
                            disabled={
                                Object.values(validationState.flags).indexOf(
                                    false
                                ) > -1 ||
                                Object.values(validationState.errors).indexOf(
                                    true
                                ) > -1
                            }
                        ></Button>
                        {!restart && (
                            <p className={styles.errtxt}>{response.message}</p>
                        )}
                    </CustomForm>
                </div>
            </div>
            {/* <div className={styles.container}>
                <div className={styles.block1}>
                    <div className={styles.box1}>A</div>
                </div>
                <div className={styles.block2}>
                    <div className={styles.box2}>B</div>
                    <div className={styles.box3}>C</div>
                    <div className={styles.box4}>D</div>
                </div>
                <div className={styles.block3}>
                    <div className={styles.box5}>E</div>
                </div>
            </div> */}
        </>
    )
}

export default Signup
