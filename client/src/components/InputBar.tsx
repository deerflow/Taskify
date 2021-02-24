import * as React from "react";
import { FormEventHandler } from "react";

const InputBar = ({ value, onInput, onSubmit } : { value: string, onInput: FormEventHandler, onSubmit: FormEventHandler }) => {
    return (
        <form onSubmit={onSubmit}>
            <input className='InputBar' value={value} type='text' onInput={onInput}/>
        </form>
    )
}

export default InputBar;