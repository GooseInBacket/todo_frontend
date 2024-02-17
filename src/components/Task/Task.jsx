import "./Task.css"
import Bin from "./Bin"
import Pencel from "./Pencel"
import CheckBox from "../CheckBox/CheckBox"

export default function Task({ id, task, edit, remove, onUpdate }) {
    return (
        <li className='task-item' key={id} onChange={() => onUpdate({...task, completed : !task.completed})}>
            <CheckBox taskId={task.id} checked={task.completed} text={task.title}/>
            <button className="controlButton" onClick={(() => edit(task))}>
                <Pencel/>
            </button>
            <button className="controlButton" onClick={() => remove(task)}>
                <Bin/>
            </button>
        </li>
    )
}