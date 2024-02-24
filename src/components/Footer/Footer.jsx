import './Footer.css'
import React from 'react'
import Cross from './Cross'
import Button from '../Button/Button'

function Footer({ onClick }) {
    return (
        <footer className='footer-control-block'>
            <Button circle={true} onClick={ onClick }>
                <Cross/>
            </Button>
        </footer>
    )
}

export default Footer