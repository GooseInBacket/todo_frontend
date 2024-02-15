import uuid from "react-uuid"

import "./PopUp.css"
import Input from "../Input/Input"
import { useState, useEffect } from "react"
import ErrorBlock from "../ErrorBlock/ErrorBlock"


export default function PopUp({ title, task = {id: uuid(), title: '', completed: false}, submit, close }) {
    const [inputValue, setInputValue] = useState(task.title)
    const [errorBlock, setErrorBlock] = useState(false)

    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.code === 'Escape') close(false);
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [])

    function saveInput(){
        if (inputValue.length <= 3) setErrorBlock(true);
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
                <div className='pop-control-block'>
                    <button className='button-control style non-accent' onClick={close}>CANCEL</button>
                    <button className='button-control style' onClick={saveInput}>APPLY</button>
                </div>
            </div>
            {errorBlock ? <ErrorBlock onAnimationEnd={setErrorBlock}/> : null}
        </div>
    )
}