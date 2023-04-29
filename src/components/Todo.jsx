import './Todo.css'

const Todo = ({ type, id, text, removeClick, completeClick }) => {
    return(
        <div type={type} id={id} className="Todo">
            <h3>{ text }</h3>
            <div className="Buttons">
                {completeClick &&
                <button className="CompleteButton" onClick={completeClick} >+</button>
                }
                <button className="RemoveButton" onClick={removeClick}>X</button>  
            </div>
            
        </div>
    )
}

export default Todo