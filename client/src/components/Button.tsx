import * as React from 'react';
import { CSSProperties } from "react";

const Button = ({ bg, text, onClick, children } : { bg: string, text: string, onClick: Function, children: JSX.ElementChildrenAttribute | string }): JSX.Element => {
    const style: CSSProperties = {
        outline: 'none',
        border: 'none',
        backgroundColor: bg,
        color: text,
        cursor: 'pointer',
        width: 'fit-content',
        padding: '0.75rem',
        display: "flex",
        margin: '0 1.5rem 1.5rem 0',
        alignSelf: 'flex-end'
    }

    return (
        <button style={style} onClick={() => onClick()}>{children}</button>
    )
}

export default Button;