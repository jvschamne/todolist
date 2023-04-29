import { useEffect, useState } from "react"

import Todo from "./Todo"
import Bar from './Bar'
import Button from './Button'
import Filter from './Filter'

import './TodoList.css'

const TodoList = () => {

    const [todos, setTodos] = useState(null)
    const [completedTodos, setCompletedTodos] = useState(null)
    const [change, setChange] = useState(false)
    const [init, setInit] = useState(true)
    const [option, setOption] = useState(null)

   
        

    useEffect(() => {
        /** Iniciar lista de todos com os todos salvos no localStorage */
        if(init == true){
            let savedTodos = localStorage.getItem("todos")
            console.log(savedTodos)
            let auxArray = []
            savedTodos = savedTodos.split(',')
            for(let i=0; i<savedTodos.length; i++){
                auxArray.push(savedTodos[i])
            }
            console.log(auxArray)

            setInit(false)
            setTodos(auxArray)


            let savedCompletedTodos = localStorage.getItem("completeTodos")
            auxArray = []
            savedCompletedTodos = savedCompletedTodos.split(',')
            for(let i=0; i<savedCompletedTodos.length; i++){
                auxArray.push(savedCompletedTodos[i])
            }
            setCompletedTodos(auxArray)
        }


        if(change == true){
            console.log('Mudou!')
            setChange(false)
            localStorage.setItem("todos", todos)
            localStorage.setItem("completeTodos", completedTodos)
        }
    })

    const handleFilterChange = () => {
         const selectedOption = document.querySelector('#selectedOption').value
        setOption(selectedOption)
        console.log(selectedOption, option)
    }

    const addNewTodo = () => {
        //set todo text
        let auxInput = document.querySelector('#input')
        
        if(todos == null){ 
            setTodos([auxInput.value])
        }

        else{
            let auxTodo = todos
            auxTodo.push(auxInput.value)
            setTodos(auxTodo)
            
            for(let i=0; i<todos.length; i++){
                console.log("Todo",todos[i], " => index:", i)
            }
            
            todos.map((todo, index) => 
                console.log(todo, index)
            )
        
        }
        //console.log all todos
        auxInput.value = ''
        console.log("Todos:",todos)
        setChange(true)
    }

    
    const removeButtonClick = (e) => {
        const toRemove = e.target.parentNode.parentNode

        console.log(toRemove.getAttribute('type'))
        if(toRemove.getAttribute('type') == 'uncompleted'){
            let aux = todos
            aux.splice(toRemove.id,1)
            setTodos(aux)
        
            //console.logs
            console.log("Todos:",todos)
            console.log("Remove:", e.target.parentNode.parentNode.id)
            
        }
        else{
            let aux = completedTodos
            aux.splice(toRemove.id, 1)
            setCompletedTodos(aux)

        }
        setChange(true)
    }

    const completeButtonClick = (e) => {
        const toComplete = e.target.parentNode.parentNode.id
        let aux = todos
        
        aux.splice(toComplete,1)
        setTodos(aux)

        //adiciona na lista de tarefas completas
        if(completedTodos == null){ 
            setCompletedTodos([aux[toComplete]])
        }

        else{
            let auxCompletedTodos = completedTodos
            auxCompletedTodos.push(aux[toComplete])
            setCompletedTodos(auxCompletedTodos)    
        }

        //console.logs
        console.log("Todos:",todos)
        console.log("Complete:", e.target.parentNode.parentNode.id)
        setChange(true)
    }


    return(
        <div className="TodoList">
           <div className='AddNewTodo'>
                <Bar/>
                <Button onClick={addNewTodo}/>
                
            </div>
            <Filter onChange={handleFilterChange}/>
           {
            option == 'Uncompleted' &&
            todos!= null && todos.map((todo, index) => (
                    <Todo type="uncompleted" id={index} text={todo} removeClick={removeButtonClick} completeClick={completeButtonClick}/>
            ))
           } 
           
           {
            option == 'Completed' &&
            completedTodos!= null && completedTodos.map((todo, index) => (
                    <Todo type="completed" id={index} text={todo} removeClick={removeButtonClick}/>
            ))
           } 
        </div>
    )
}

export default TodoList