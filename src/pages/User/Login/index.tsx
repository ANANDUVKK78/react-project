import React, {
    ChangeEvent,
    Dispatch,
    FormEvent,
    ReactElement,
    useState,
} from 'react'
import { RootStateOrAny, useDispatch, useSelector, connect } from 'react-redux'
import { Label, Textbox, Button } from 'components'
import CustomForm from 'container'
import styles from './styles.scss'
import { joinClass, history } from 'helpers'
import { userActions, userTypes } from 'store'
import { useForm, validateSignupForm } from 'hooks'

const Login = (props: any): ReactElement => {
    const emailErrorText: string = 'Invalid Email id'
    const emptyText: string = 'Password is required'
    // const response: { success?: boolean; message?: string } = useSelector(
    //     (state: RootStateOrAny) =>
    //         state.userReducer.loginResp || { message: '' }
    // )

    // const dispatch: Dispatch<userTypes.LoginUserActionType> = useDispatch()
    const [restart, setRestart] = useState<boolean>(false)

    const { handleChange, state, validationState } = useForm(
        validateSignupForm,
        {
            flags: {
                emailTouched: false,
                passwordTouched: false,
            },
            errors: {
                emailErr: false,
                passwordEmptyErr: false,
            },
        }
    )

    const loginUser = (): void => {
        // dispatch(userActions.ClearResponse())
        props.clearResponse()
        const data = {
            email: state.email.trim(),
            password: state.password.trim(),
        }
        // dispatch(userActions.LoginUserRequest(data))
        props.loginUserRequest()
        setRestart(false)
    }

    return (
        <>
            <div className={styles.cover}>
                <div className={styles['login-container']}>
                    <div className={styles['login-info-bar']}>
                        <h1 className={styles['info-header']}>INFORMATION</h1>
                        <div className={styles['info-txt']}>
                            This is a typical auth session for default values
                            and checks made.Also winding of,with barb wire and
                            blue whale games. All should take extreme
                            precautions when signing the deal.This is a•• deal
                            of lifetime.Happy surviving.
                        </div>
                        <Button
                            type="button"
                            className={joinClass(
                                styles['reg-nav-btn'],
                                styles.strongtxt
                            )}
                            label="Register Here"
                            click={() => {
                                history.push('/signup')
                            }}
                        ></Button>
                    </div>
                    <CustomForm
                        className={styles['login-form']}
                        formSubmit={(e: FormEvent) => {
                            e.preventDefault()
                            loginUser()
                        }}
                    >
                        <div className={styles.registerheader}>
                            <div
                                className={joinClass(
                                    styles.loginText,
                                    styles.strongtxt
                                )}
                            >
                                LOGIN
                            </div>
                        </div>

                        <div className={styles['top-40']}>
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

                        <div className={styles['top-40']}>
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

                        <Button
                            type="submit"
                            className={joinClass(
                                styles['login-btn'],
                                styles.strongtxt
                            )}
                            label="Login"
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
                            <p className={styles.errtxt}>{props.response.message}</p>
                        )}
                    </CustomForm>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        response: state.userReducer.loginResp,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUserRequest: (data) =>
            dispatch(userActions.LoginUserRequest(data)),
        clearResponse: () => dispatch(userActions.ClearResponse()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
