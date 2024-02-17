import './CheckBox.css'
import Mark from './Mark'

export default function CheckBox({ checked, text }) {
    return (
        <label className="customCheckbox">
            <input checked={checked} type="checkbox" className="hidden-checkbox" readOnly/>
            <div className="checkbox">
                <Mark className={"checkmark"}/>
            </div>
            <span>{ text }</span>
        </label>
    )
}