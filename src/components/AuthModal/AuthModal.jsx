import './AuthModal.css'
import discordLogo from '../../assets/discord logo.png'
import yandexLogo from '../../assets/yandex logo.png'
import googleLogo from '../../assets/google logo.png'

function AuthModal() {
    function openAuth(service){
        let url = `http://127.0.0.1:8000/authorize/${service}`
        window.location.href = url
    }

    return (
        <div className='modal--bg'>
            <div className='auth-modal'>
                <h1>Log in</h1>
                <div className="modal-block">  
                    <button className='modal-auth-button style' name='yandex' onClick={() => openAuth('yandex')}>
                        <img src={yandexLogo} alt='yandex'></img>
                    </button>
                    <button className='modal-auth-button style' name='google' onClick={() => openAuth('google')}>
                        <img src={googleLogo} alt='google'></img>
                    </button>
                    <button className='modal-auth-button style' name='discord' onClick={() => openAuth('discord')}>
                        <img src={discordLogo} alt='discord'></img>
                    </button>
                </div>  
            </div>
        </div>
    )
}

export default AuthModal