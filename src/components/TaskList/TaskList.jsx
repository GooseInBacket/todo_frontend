import uuid from "react-uuid";

import "./TaskList.css"
// import EmptySvg from "./Empty.svg";
import Task from "../Task/Task";
import EmptySvg from "./EmptySvg";

export default function TaskList({ tasks, edit, remove, onUpdate }) {
    return (
        <ul className="task-list">
            {tasks.length ? (
                tasks.map((task) => <Task key={uuid()} task={task} edit={edit} remove={remove} onUpdate={onUpdate}/>)
            ) : (
                <div className="empty-block">
                    <EmptySvg/>
                    <h1>Empty...</h1>
                </div>
            )}
        </ul>
    );
}