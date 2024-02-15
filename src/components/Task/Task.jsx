import "./Task.css"
import Bin from "./Bin"
import Pencel from "./Pencel"
import CheckBox from "../CheckBox/CheckBox"

export default function Task({ id, task, edit, remove, onUpdate }) {
    return (
        <li className='task-item' key={id}>
            {/* <CheckBox taskId={task.id} checked={task.checked} text={task.text} onUpdate={onUpdate}/> */}
            <CheckBox taskId={task.id} checked={task.completed} text={task.title} onUpdate={onUpdate}/>
            <button className="controlButton" onClick={(() => edit(task))}>
                <Pencel/>
            </button>
            <button className="controlButton" onClick={() => remove(task)}>
                <Bin/>
            </button>
        </li>
    )
}