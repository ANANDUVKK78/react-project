import { useState } from "react";
import { FormStateType } from "types";
import { ValidationStateType } from "./types/types";

const useForm = (validateForm, validityState: ValidationStateType,defaultState={}): any => {
    const [state, setFormState] = useState<FormStateType>({...defaultState});
    const [validationState, setvalidationState] = useState<ValidationStateType>(validityState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        const { name, value } = e.target;
        const obj = Object.values(state)[0] ? state : defaultState;

        setFormState({ ...obj, [name]: value });
        setvalidationState(validateForm(e, state, validationState));
    };

    return {
        handleChange,
        state,
        validationState,
    };
}

export default useForm;

