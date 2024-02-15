import './CheckBox.css'
import Mark from './Mark'

import { useState } from 'react'

export default function CheckBox({ taskId, checked, text, onUpdate }) {
    return (
        <label className="customCheckbox">
            <input checked={checked} type="checkbox" className="hidden-checkbox" onChange={() => onUpdate(taskId)}/>
            <div className="checkbox">
                <Mark className={"checkmark"}/>
            </div>
            <span>{ text }</span>
        </label>
    )
}