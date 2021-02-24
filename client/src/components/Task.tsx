import * as React from "react";
import TaskProps from "../interfaces/TaskProps";

const Task = ({ text, date, done, id, onTaskClick } : TaskProps) => {
    return <li className={done ? 'Task Task--done' : 'Task'} onClick={() => onTaskClick(id)}>{text}</li>;
}

export default Task;