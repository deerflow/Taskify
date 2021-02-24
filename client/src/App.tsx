import * as React from "react";
import InputBar from "./components/InputBar";
import TaskInterface from "./interfaces/TaskInterface";
import TasksList from "./components/TasksList";
import { FormEvent, FormEventHandler } from "react";
import Button from "./components/Button";

const App = () => {
    const [currentId, setCurrentId] : [number, Function] = React.useState(0)
    const [inputValue, setInputValue] : [string, Function] = React.useState('');
    const [tasksList, setTasksList] : [TaskInterface[], Function] = React.useState([] as TaskInterface[]);

    React.useEffect(() => {
        getTasks()
            .then((tasks: TaskInterface[]) => setTasksList(tasks))
            .catch((e: Error) => console.error(e));
    }, [])

    const getTasks: Function = async () => {
        const res = await fetch('/api/tasks');
        const json = await res.json();
        return json.map((taskDocument: any) => {
            const task: TaskInterface = {
                text: taskDocument.text,
                date: taskDocument.date,
                done: taskDocument.done,
                id: currentId
            }
            setCurrentId(currentId + 1);
            return task;
        }) as TaskInterface[];
    }

    const addTask = (text: string) => {
        const date = new Date();
        setTasksList([...tasksList, { text: text, date: date, done: false, id: currentId } as TaskInterface]);
        setCurrentId(currentId + 1);
        fetch('/api/task', {
            method: 'POST',
            body: JSON.stringify({ text: text, date: date }),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch((e: Error) => console.error(e));
    }

    const removeDoneTasks: Function = (): void => {
        setTasksList(tasksList.filter((task: TaskInterface) => !task.done));
        fetch('/api/tasks', {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch((e: Error) => console.error(e));
    }

    const onInputBarChange: FormEventHandler = (e: any) => {
        setInputValue(e.target.value);
    }

    const onInputBarSubmit: FormEventHandler = (e: FormEvent) => {
        e.preventDefault();
        const alreadyExists = tasksList.some((task: TaskInterface) => task.text === inputValue);
        const isNotEmpty = inputValue.match(/\S+/)
        if (!alreadyExists && isNotEmpty) {
            addTask(inputValue);
            setInputValue('');
        }
    }

    const onTaskClick: Function = (id: number): void => {
        console.log('click');
        setTasksList(tasksList.map((task: TaskInterface, index: number) => {
            if (id === task.id) task.done = !task.done;
            fetch('/api/task', {
                method: 'PUT',
                body: JSON.stringify({ text: task.text, done: task.done }),
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => console.log(json))
                .catch((e: Error) => console.error(e));
            return task;
        }));
    }

    return (
        <div className="App">
            <h1 style={{ margin: '1rem 0 2rem 2.75rem' }}>Taskify</h1>
            <Button bg={'#cd0101'} text='#fff' onClick={removeDoneTasks}>Delete done tasks</Button>
            <section className='row'>
                <section className="column">
                    <h2 className="section-title">To do</h2>
                    <InputBar value={inputValue} onInput={onInputBarChange} onSubmit={onInputBarSubmit} />
                    <TasksList list={tasksList.filter((task: TaskInterface) => !task.done)} onTaskClick={onTaskClick}/>
                </section>
                <section className="column">
                    <h2 className="section-title">Done</h2>
                    <TasksList list={tasksList.filter((task: TaskInterface) => task.done)} onTaskClick={onTaskClick}/>
                </section>
            </section>
        </div>
    )
}

export default App;