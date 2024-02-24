import './Main.css'
import ApiService from '../../api/ApiService'
import AuthModal from '../../components/AuthModal/AuthModal'
import MainBlock from '../../components/MainBlock/MainBlock'

import { useEffect, useState } from 'react'


export default function Main() { 
    let [ authorize, setAuthorize ] = useState(false);
    let [ modal, setModal ] = useState(false)

    return (
        <>
            { !authorize && <MainBlock onClick={setModal} /> }
            { modal && <AuthModal/>}
        </>
    )
}