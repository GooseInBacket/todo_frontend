import './MainBlock.css'
import MainLogo from './logo.svg'
import Button from '../../components/Button/Button'
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher'


function MainBlock( { onClick } ) {
    return (
        <main className='base--main main-page--main'>
            <article className='main--article'>
                <div className='main--header'>TODO LIST</div>
                <img className='img-block' src={MainLogo}/>
                <div className='button-case'>
                    <Button onClick={() => {onClick(true)}}>Log in</Button>
                    <ThemeSwitcher/>
                </div>
            </article>
        </main>
    )
}

export default MainBlock