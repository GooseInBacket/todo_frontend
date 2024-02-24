import './ControlPanel.css'
import Dropdown from '../Dropdown/Dropdown'
import Input from '../Input/Input'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'

export default function ControlPanel( { queryHandler, filterHandler } ) {
    return (
        <div className='panel'>
            <Input type={'search'} placeholder={'Search note...'} queryHandler={queryHandler}/>
            <Dropdown filterHandler={filterHandler}/>
            <ThemeSwitcher/>
        </div>
    )
}