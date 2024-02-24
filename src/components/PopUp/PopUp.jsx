import uuid from "react-uuid"

import "./PopUp.css"
import Input from "../Input/Input"
import Button from "../Button/Button"

import { useState, useEffect } from "react"


export default function PopUp({ title, task = {id: uuid(), title: '', completed: false}, submit, close, onError }) {
    const [inputValue, setInputValue] = useState(task.title)

    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.code === 'Escape') close(false);
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [])

    function saveInput(){
        if (inputValue.length <= 3) onError('Задача должна быть длиннее 3-х символов');
        else submit({...task, title : inputValue});

    }

    function handlerEnterKey(e){
            if (e.key == 'Enter') saveInput()
    }

    function handlerOverlayClick(e){
        if (e.target.className.includes('add-new-task-block')) close(false);
    }

    return (
        <div className="add-new-task-block open" onClick={handlerOverlayClick}>
            <div className='pop-add-new-task'>
                <h2 className='pop-title'>{ title }</h2>
                <Input type={'text'} id={'input-task'} placeholder={'Input note...'} value={inputValue} queryHandler={setInputValue} onKeyDown={handlerEnterKey}/>
                <div className="lettersCounters">{inputValue.length} / 256</div>
                <div className='pop-control-block'>
                    <Button lightTheme={true} onClick={close}>CANCEL</Button>
                    <Button onClick={saveInput}>APPLY</Button>
                </div>
            </div>
        </div>
    )
}