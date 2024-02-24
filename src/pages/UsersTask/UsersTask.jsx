import ApiService from '../../api/ApiService.js'

import PopUp from '../../components/PopUp/PopUp.jsx'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import TaskList from '../../components/TaskList/TaskList.jsx'
import PreLoader from '../../components/PreLoader/PreLoader.jsx'
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock.jsx'
import ControlPanel from '../../components/ControlPanel/ControlPanel.jsx'

import { useEffect, useMemo, useState } from 'react'


function UserTasks() {
    const [tasks, setTask] = useState([]);
    const [isError, setError] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [currentFilter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentEditTask, setEditTask] = useState(null);
    const [addingNewTask, setAddingNewTask] = useState(false);

    const api = new ApiService()

    useEffect(() => {
        setLoading(true);
        api.getAllPosts()
        .then(json => { setTask(json); setLoading(false) })
        .catch(() => window.location.replace('/'))
    }, [])

    const filteredTasks = useMemo(() => {
        if (currentFilter == 'All') return tasks
        else if (currentFilter == 'Complete') return tasks.filter((x) => x.completed == 1)
        else if (currentFilter == 'Incomplete') return tasks.filter((x) => x.completed == 0)
    }, [currentFilter, tasks])

    const filteredAndSearchedTasks = useMemo(() => {
        return filteredTasks.filter((x) => x.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, filteredTasks])


    function addNewTask(task){
        api.addTask(task)
        .then(() => {
            setTask([...tasks, task]);
            setAddingNewTask(false);
        })
        .catch((e) => setError(e.message));
    }

    function removeTask(task){
        api.removeTask(task.id).then(() => { setTask(tasks.filter((t) => t.id != task.id)) })
    }

    function updateTask(task, hasTitle = false){
        setTask(tasks.map((t) => {
            if (t.id != task.id) return {...t}
        
            api.updateTask(task.id, task)
            return task
        }))

        hasTitle && setEditTask(null);
    }

    return (
        <>
            <main className='base--main'>
                {
                    isLoading 
                    ? <PreLoader/>
                    : 
                    <article>
                        <Header/>
                        <ControlPanel queryHandler={(text) => setSearchQuery(text)} filterHandler={(text) => setFilter(text)}/>
                        {isLoading
                            ? <PreLoader/>
                            : <TaskList tasks={filteredAndSearchedTasks} edit={(task) => setEditTask(task)} remove={removeTask} onUpdate={updateTask}/>
                        }
                        <Footer onClick={setAddingNewTask}/>
                    </article>
                }
            </main>
                
            {isError && <ErrorBlock message={isError} onAnimationEnd={setError}/>}
            { addingNewTask && <PopUp title={'NEW NOTE'} submit={addNewTask} close={() => setAddingNewTask(false)} onError={setError} /> }
            { currentEditTask && <PopUp title={'EDIT TASK'} task={currentEditTask} submit={(t) => updateTask(t, true)} close={() => setEditTask(null)} onError={setError}/> }
        </>
    )
}

export default UserTasks
