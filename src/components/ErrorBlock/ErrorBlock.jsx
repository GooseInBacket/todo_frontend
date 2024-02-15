import './ErrorBlock.css'

export default function ErrorBlock({ onAnimationEnd }) {
    return (
        <div className='error-block' onAnimationEnd={() => onAnimationEnd(false)}>
            <h3>Error</h3>
            <div>Задача должна быть длиннее 3-х символов</div>
        </div>
    )
}