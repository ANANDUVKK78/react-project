import { ChangeEvent } from "react";
import { UserType, ValidationStateType } from "./types/types";

export const validateSignupForm = (event: ChangeEvent<HTMLInputElement>, values: UserType, validationState: ValidationStateType): ValidationStateType => {

    const emailRegex:RegExp = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}/;



    switch (event.target.name) {

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
        case 'password': case 'cpassword':
            if (event.target.name === 'password') {
                validationState.flags['passwordTouched'] = true;
                if (
                    !event.target.value ||
                    (event.target.value && !event.target.value.trim())) {
                    validationState.errors['passwordEmptyErr'] = true;
                }
                else {
                    validationState.errors['passwordEmptyErr'] = false;
                    if (values.cpassword && values.cpassword.trim() && event.target.value !== values.cpassword) {
                        validationState.errors['mismatchErr'] = true;
                    } else {

                        validationState.errors['mismatchErr'] = false;
                    }
                }
            } else {
                validationState.flags['cpasswordTouched'] = true;
                if (
                    !event.target.value ||
                    (event.target.value && !event.target.value.trim())) {
                    validationState.errors['cpasswordEmptyErr'] = true;
                }
                else {
                    validationState.errors['cpasswordEmptyErr'] = false;
                    if (values.password && values.password.trim() && event.target.value !== values.password) {
                        validationState.errors['mismatchErr'] = true;
                    } else {

                        validationState.errors['mismatchErr'] = false;
                    }
                }
            }
            break;

        default:
            break;
    }


    return validationState;
};
