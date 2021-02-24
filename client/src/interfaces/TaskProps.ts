interface TaskProps {
    key: number;
    text: string;
    date: Date;
    done: boolean;
    onTaskClick: Function;
    id: number;
}

export default TaskProps;