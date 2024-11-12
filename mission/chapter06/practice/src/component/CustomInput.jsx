import './CustomInput.css'

const CustomInput = (props)=>{
    const { typeingText, defaultValue, func } = props
    return(
        <input
         className="cusInput"
         type='text'
         value = {typeingText}
         defaultValue={defaultValue}
         onChange={(e)=>{func(e.target.value);}
        }
        />
    ) 

}

export default CustomInput;