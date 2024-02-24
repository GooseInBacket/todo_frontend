import React from 'react'
import './Button.css'

function Button( props ) {
    let style = props.lightTheme ? 'button-control style non-accent' : 'button-control style'
    style += (typeof props.children == 'string') ? ' pd' : ''
    style += props.circle ? ' circle' : ''

    return (
        <button className={ style } onClick={ props.onClick }>
            { props.children }
        </button>
    )
}

export default Button