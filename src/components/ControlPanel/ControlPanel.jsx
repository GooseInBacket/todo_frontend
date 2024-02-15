import './ControlPanel.css'
import SvgSelector from './SvgSelector'
import Dropdown from '../Dropdown/Dropdown'
import Input from '../Input/Input'
import { useEffect, useState } from 'react'

export default function ControlPanel( { queryHandler, filterHandler } ) {
    const [theme, setTheme] = useState('light');
    function switchButton(){
        setTheme(theme == 'light' ? 'dark' : 'light');
    }
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    })

    return (
        <div className='panel'>
            <Input type={'search'} placeholder={'Search note...'} queryHandler={queryHandler}/>
            <Dropdown filterHandler={filterHandler}/>
            <div className='theme style' onClick={switchButton}>
                <SvgSelector/>
            </div>
        </div>
    )
}