import './Button.css'

const Button = ({onClick}) => {
    return(
        <button className='Add-button' onClick={onClick}>Add Todo</button>
    )
}

export default Button