import TaskService from './api/taskService.js'

import Header from './components/Header/Header.jsx'
import ControlPanel from './components/ControlPanel/ControlPanel.jsx'
import TaskList from './components/TaskList/TaskList.jsx'
import PopUp from './components/PopUp/PopUp.jsx'
import AddButton from './components/AddButton/AddButton.jsx'
import PreLoader from './components/PreLoader/PreLoader.jsx'

import { useEffect, useMemo, useState } from 'react'

function App() {
  const [tasks, setTask] = useState([]);
  const [currentFilter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEditTask, setEditTask] = useState(null);
  const [addingNewTask, setAddingNewTask] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTask(){ 
      setLoading(true);
      setTask(await TaskService.getAll())
      setLoading(false);
    }
    fetchTask()
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
    TaskService.add(task);
    setTask([...tasks, task]);
    setAddingNewTask(false);
  }

  function removeTask(task){
    TaskService.remove(task.id)
    setTask(tasks.filter((t) => t.id != task.id))
  }

  function updateTask(task, hasTitle = false){
    setTask(tasks.map((t) => {
      if (t.id != task.id) return {...t}

      TaskService.update(task.id, task)
      return task
    }))

    if (hasTitle) setEditTask(null);
  }

  return (
    <>
        <main>
          <article>
            <Header/>
            <ControlPanel queryHandler={(text) => setSearchQuery(text)} filterHandler={(text) => setFilter(text)}/>
            {isLoading
              ? <PreLoader/>
              : <TaskList tasks={filteredAndSearchedTasks} edit={(task) => setEditTask(task)} remove={removeTask} onUpdate={updateTask}/>
            }
            <AddButton onClick={setAddingNewTask}/>
          </article>
        </main>

        { addingNewTask && <PopUp title={'NEW NOTE'} submit={addNewTask} close={() => setAddingNewTask(false)}/> }
        { currentEditTask && <PopUp title={'EDIT TASK'} task={currentEditTask} submit={(t) => updateTask(t, true)} close={() => setEditTask(null)}/> }
    </>
  )
}

export default App
