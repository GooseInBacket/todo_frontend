import './Input.css'

export default function Input({id, type, placeholder, queryHandler, value, onKeyDown = (e) => (e)}) {

    return (
        <input 
            type={type} 
            className="input-stl" 
            placeholder={placeholder} 
            id={id} 
            name='input-data'
            value={value} 
            onChange={(e) => {queryHandler(e.target.value)}} 
            onKeyDown={(e) => onKeyDown(e)}
            minLength={3} 
            maxLength={256}
            autoFocus
        />
    )
}