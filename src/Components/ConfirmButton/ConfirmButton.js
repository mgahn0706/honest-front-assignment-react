import './ConfrmedButton.css'

const ConfirmButton = ({text, disabled, onClick}) => {
    return(
        disabled ? <button className="confirmButtonDisable" disabled>{text}</button>
        : <button className="confirmButton" onClick={onClick}>{text}</button> );

}

export default ConfirmButton;