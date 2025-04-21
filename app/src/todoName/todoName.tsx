'use client';
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";


export default function TodoName({todoName, updateName}) {

    const [isEditing, setIsEditing] = useState(false);
    const inputAreaRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputAreaRef.current) {
            inputAreaRef.current.focus();
        }
    }, [isEditing]);


    if (!isEditing) {
        return (
            <>
            <h1 onClick={(e) => {
                e.preventDefault();
                setIsEditing(!isEditing);
            }}>{todoName}</h1>
            </>
        )
    } else {
        return (
            <>
            <input ref={inputAreaRef} type="text" defaultValue={todoName}
            onBlur={(e) => {
                updateName(e.target.value);
                setIsEditing(!isEditing);
            }}>
            </input>
            </>
        )
    }
}