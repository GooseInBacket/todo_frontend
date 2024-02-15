import './Dropdown.css'

import Arrow from './Arrow';

import { useEffect, useRef, useState } from 'react'

export default function Dropdown({ filterHandler }) {
    const filterList = useRef(null);
    let [filter, setFilter] = useState('ALL');
    let [listOpened, setListOpened] = useState(false);

    function chooseFilter(e) {
        let text = e.target.innerText;
        setFilter(text.toUpperCase())
        filterHandler(text)

        setListOpened(false)
    }

    useEffect(() => {
        if (!listOpened) return

        const handleClick = e => {
            if (!filterList.current) return;
            if (!filterList.current.contains(e.target)) setListOpened(false);
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [listOpened])

    return (
        <div className='select' ref={filterList}>
            <div type='button' name="filter" className='filter style' onClick={() => setListOpened(!listOpened)}>
                {filter}
                <Arrow className={listOpened ? 'arrow look-up' : 'arrow'}/>
            </div>
            {
                listOpened ?
                    <ul className='selectList open'>
                        <li className="filterItem" onClick={chooseFilter}>All</li>
                        <li className="filterItem" onClick={chooseFilter}>Complete</li>
                        <li className="filterItem" onClick={chooseFilter}>Incomplete</li>
                    </ul>
                : null
            }
        </div>
    )
}