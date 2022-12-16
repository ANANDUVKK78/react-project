import { ChangeEvent } from "react";
import { UserType, ValidationStateType } from "./types/types";

export const validateEmployeeForm = (event: ChangeEvent<HTMLInputElement>, values: UserType, validationState: ValidationStateType): ValidationStateType => {
    const alphaRegex:RegExp = /^[a-zA-Z_]*$/;
    const emailRegex:RegExp = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}/;
    const phoneRegex:RegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    const expRegex:RegExp = /^([0-9]|[1-4][0-9]|50)\d*(?:\.\d{1})?$/



    switch (event.target.name) {

        case 'firstname': case 'lastname': case 'desg':
            if (event.target.name === 'firstname') {
                validationState.flags['firstnameTouched'] = true;
                if (
                    !event.target.value ||
                    (event.target.value && !event.target.value.trim()) ||
                    (event.target.value && !alphaRegex.test(event.target.value))
                ) {

                    validationState.errors['firstnameErr'] = true;

                } else {
                    validationState.errors['firstnameErr'] = false;
                }
            } else if (event.target.name === 'lastname') {
                validationState.flags['lastnameTouched'] = true;

                if (
                    !event.target.value ||
                    (event.target.value && !event.target.value.trim()) ||
                    (event.target.value && !alphaRegex.test(event.target.value))
                ) {

                    validationState.errors['lastnameErr'] = true;

                } else {
                    validationState.errors['lastnameErr'] = false;
                }
            } else {
                validationState.flags['desgTouched'] = true;

                if (
                    !event.target.value ||
                    (event.target.value && !event.target.value.trim()) ||
                    (event.target.value && !alphaRegex.test(event.target.value))
                ) {
                    validationState.errors['desgErr'] = true;

                } else {
                    validationState.errors['desgErr'] = false;

                }


            }
            break;

        case 'email':
            validationState.flags['emailTouched'] = true;
            if (
                !event.target.value ||
                (event.target.value && !event.target.value.trim()) ||
                (event.target.value && !emailRegex.test(event.target.value))
            ) {
                validationState.errors['emailErr'] = true;
            } else {
                validationState.errors['emailErr'] = false;

            }
            break;

        case 'phone':
            validationState.flags['phoneTouched'] = true;

            if (
                !event.target.value ||
                !event.target.value.trim() ||
                (event.target.value && !phoneRegex.test(event.target.value))
            ) {
                validationState.errors['phoneErr'] = true;

            } else {
                validationState.errors['phoneErr'] = false;

            }
            break;
        case 'exp':
            validationState.flags['expTouched'] = true;

            if (
                !event.target.value ||
                !event.target.value.trim() ||
                (event.target.value && !expRegex.test(event.target.value))
            ) {
                validationState.errors['expErr'] = true;

            } else {
                validationState.errors['expErr'] = false;

            }
            break;

        case 'dob': case 'doj':
            if (event.target.name === 'dob') {
                validationState.flags['dobTouched'] = true;
                if (event.target.value && event.target.value.trim()) {
                    if (
                        values.doj &&
                        values.doj.trim() &&
                        new Date(event.target.value).getTime() >
                        new Date(values.doj).getTime()
                    )

                        validationState.errors['dobErr'] = true;

                    else {
                        validationState.errors['dobErr'] = false;
                        validationState.errors['dojErr'] = false;
                    }

                } else {
                    validationState.errors['dobErr'] = true;

                }
            } else {
                validationState.flags['dojTouched'] = true;
                if (event.target.value && event.target.value.trim()) {
                    if (
                        values.dob &&
                        values.dob.trim() &&
                        new Date(event.target.value).getTime() <
                        new Date(values.dob).getTime()
                    )

                        validationState.errors['dojErr'] = true;

                    else {
                        validationState.errors['dobErr'] = false;
                        validationState.errors['dojErr'] = false;
                    }

                } else {
                    validationState.errors['dojErr'] = true;

                }

            }
            break;




        default:
            break;
    }


    return validationState;
};
