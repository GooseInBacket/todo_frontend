import React from 'react'
import SvgSelector from './SvgSelector';
import Button from '../Button/Button';

import { useState, useEffect } from 'react';

function ThemeSwitcher() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    
    function switchButton(){
        setTheme(theme == 'light' ? 'dark' : 'light');
        localStorage.setItem('theme', theme == 'light' ? 'dark' : 'light')
    }

    useEffect(() => {document.body.setAttribute('data-theme', theme)})

    return (
        <Button onClick={ switchButton }>
            <SvgSelector/>
        </Button>
    )
}

export default ThemeSwitcher