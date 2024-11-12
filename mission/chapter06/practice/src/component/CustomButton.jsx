import './CustomButton.css';

const CustomButton = (props) =>{
    const { text, func} = props;
   return(
        <button className='cusBtn' onClick={func}>{text}</button>
   )
}

export default CustomButton;