import './Filter.css'

const Filter = ({onChange}) => {
    return(
        <div className="Filter">
            <select id="selectedOption" onChange={onChange}>
                <option value="Uncompleted">Uncompleted</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
        
    )
}

export default Filter