import * as React from "react";

import TaskInterface from "../interfaces/TaskInterface";
import Task from "./Task";

const TasksList = ({ list, onTaskClick } : { list: TaskInterface[], onTaskClick: Function }) => {
    return (
        <ul className='TasksList'>
            {list.map((task: TaskInterface, index: number) => (
                <Task
                    id={task.id}
                    key={index}
                    text={task.text}
                    date={task.date}
                    done={task.done}
                    onTaskClick={onTaskClick}
                />
            ))}
        </ul>
    );
}

export default TasksList;