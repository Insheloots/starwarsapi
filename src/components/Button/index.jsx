import './Button.css';

const Button = (props) => {
    return <button className='opacity-75 hover:opacity-100' onClick={props.handleClick}>{props.text}</button>
}

export default Button;