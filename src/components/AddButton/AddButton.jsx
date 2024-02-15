import './AddButton.css'
import React from 'react'
import Cross from './Cross'

function AddButton({ onClick }) {
    return (
        <div className='footer-control-block'>
            <button className='addButton style' onClick={() => onClick(true)}><Cross/></button>
        </div>
    )
}

export default AddButton