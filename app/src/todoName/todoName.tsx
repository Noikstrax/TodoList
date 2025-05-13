'use client';
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

type todoNameComponentProps = {
    todoName: string,
    updateName: (name: string) => void
}

export default function TodoName({todoName, updateName}: todoNameComponentProps) {

    const [isEditing, setIsEditing] = useState(false);
    const inputAreaRef = useRef<HTMLInputElement | null>(null);

    const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isEditing && e.key === 'Enter') {
            const target = e.target as HTMLInputElement;
            updateName(target.value);
            setIsEditing(!isEditing);
        }
    }

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
            }}
            onKeyDown={handleEnterKeyDown}>
            </input>
            </>
        )
    }
}