import React from 'react';
import {invoke} from "@tauri-apps/api/tauri";

interface IProps {
    name: string,
    color: string,
    id: number,
    updateCallback: string
}
const ColorPicker: React.FC<IProps> = ({ id, name, color, updateCallback}) => {
    const updateColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        invoke(updateCallback, {id, color: event.currentTarget.value})
            .then(console.log)
            .catch(console.error)
    }
    return <div>
        <span>{name}</span>
        <input value={color} onChange={updateColor}/>
    </div>
}

export default ColorPicker