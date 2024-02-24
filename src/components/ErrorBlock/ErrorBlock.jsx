import './ErrorBlock.css'

export default function ErrorBlock({ message, onAnimationEnd }) {
    return (
        <div className='error-block' onAnimationEnd={() => onAnimationEnd(false)}>
            <h3>Error</h3>
            <div>{ message }</div>
        </div>
    )
}