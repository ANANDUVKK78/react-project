export interface ValidationStateType {
    errors?: {
        firstnameErr?: boolean,
        lastnameErr?: boolean,
        emailErr?: boolean,
        passwordEmptyErr?: boolean,
        cpasswordEmptyErr?: boolean,
        mismatchErr?: boolean,
        phoneErr?: boolean,
        desgErr?: boolean,
        dobErr?: boolean,
        dojErr?: boolean,
        expErr?: boolean,
    },
    flags?: {
        firstnameTouched?: boolean,
        lastnameTouched?: boolean,
        emailTouched?: boolean,
        passwordTouched?: boolean,
        cpasswordTouched?: boolean,
        desgTouched?: boolean,
        dobTouched?: boolean,
        dojTouched?: boolean,
        phoneTouched?: boolean,
        expTouched?: boolean,

    }
}

export interface UserType {
    firstname?: string,
    lastname?: string,
    email?: string,
    password?: string,
    cpassword?: string,
    exp?: string,
    phone?: string,
    dob?: string,
    doj?: string
}
