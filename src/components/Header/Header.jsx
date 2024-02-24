import './Header.css'

import Button from '../Button/Button'
import ApiService from '../../api/ApiService'

import { useEffect, useState, useRef } from 'react'

export default function Header() {
    const modal = useRef(null);
    const [rightMenu, setRightMenu] = useState(false);
    const [userName, setUserName] = useState('unknown');

    const api = new ApiService()

    useEffect(() => {
        api.getUserInfo()
        .then(res => res.json())
        .then((json) => {
            localStorage.setItem('avatar', json.avatar)
            setUserName(json.username)
        })
    }, [])

    useEffect(() => {
        if (!rightMenu) return

        const handleClick = e => {
            if (!modal.current) return;
            if (e.target.className == 'profile') return;
            if (!modal.current.contains(e.target)) setRightMenu(false);
        };

        document.addEventListener('click', handleClick);
        return () => { document.removeEventListener('click', handleClick); };
    }, [rightMenu])

    return (
        <header>
            <h1 className='title'>TODO LIST</h1>
            <Button circle={ true } onClick={ () => setRightMenu(!rightMenu) }>
                <img src={localStorage.getItem('avatar')} className='profile' alt=''/>
            </Button>


            <div className={rightMenu ? 'right-menu' : 'right-menu hide'} ref={ modal }>
                <div className='inner-panel'>
                    <div>{ userName }</div>
                    <Button onClick={ () => {api.logOut().then(window.location.replace('/'))} }>Log out</Button>
                </div>
            </div>

        </header>
    )
}