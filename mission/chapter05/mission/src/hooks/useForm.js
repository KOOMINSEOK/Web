import { useState } from "react";
import { useEffect } from "react";
function useForm({initialValue, validate}){
    const [values, setValues] = useState(initialValue);
    const [touched, setTouched] = useState({});
    const [errors , setErrors] = useState({});

    const handleChangeInput = (name, value) => {
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleBlur = (name) => {
        setTouched({
            ...touched,
            [name]: true
        })
    }

    const getTextInputProps = (name) =>{
        const value = values[name];
        const onChange = (event) => handleChangeInput(name,event.target.value);
        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur}
    }

    useEffect(()=>{
        const newErrors = validate(values);
        setErrors(newErrors);
        console.log(values.password);
        console.log(values.passwordCheck);
    },[validate,values])
    return {values, errors, touched, getTextInputProps}
}

export default useForm;