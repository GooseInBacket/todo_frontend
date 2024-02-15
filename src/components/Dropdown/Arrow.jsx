import React from 'react'

function Arrow({ className }) {
    return (
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M4 4L1 1" stroke="#F7F7F7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 1L4 4" stroke="#F7F7F7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default Arrow

