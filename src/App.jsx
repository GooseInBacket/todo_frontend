import Header from './components/Header/Header.jsx'
import ControlPanel from './components/ControlPanel/ControlPanel.jsx'
import TaskList from './components/TaskList/TaskList.jsx'
import PopUp from './components/PopUp/PopUp.jsx'
import AddButton from './components/AddButton/AddButton.jsx'

import { useEffect, useMemo, useState } from 'react'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJidXNpbmdvb3NlIiwic2NvcGVzIjpbIm1lIiwiaXRlbXMiXSwiZXhwIjoxNzA4MTA1MDY5fQ.8bf5wM3a29wYnraQhdrFOzsmppulgp6s8WVp2vDs4pw"

function fetchData(method, url, body, handler, err){
  const myHeaders = new Headers();

  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Accept", 'application/json');
  myHeaders.append("Content-Type", 'application/json');

  const requestOptions = {
    method: method,
    headers: myHeaders,
    body: body ? JSON.stringify(body) : null
  };

  fetch(url, requestOptions)
  .then((response) => response.status >= 400 ? [] : response.json())
  .then((result) => handler(result))
  .catch((error) => err(error));
}

function App() {
  const [tasks, setTask] = useState([]);
  const [currentFilter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEditTask, setEditTask] = useState(null);
  const [addingNewTask, setAddingNewTask] = useState(false);

  useEffect(() => {
    fetchData('GET', 'http://127.0.0.1:8000/tasks/?skip=0&limit=100', null, setTask, console.error)
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
    fetchData('POST', 'http://127.0.0.1:8000/tasks/', task, console.log, console.error);

    setTask([...tasks, task]);
    setAddingNewTask(false);
  }

  function putCompleteTask(taskId){
    setTask(tasks.map((t) => {
      if (t.id != taskId) return {...t}

      fetchData('PUT', `http://127.0.0.1:8000/tasks/${taskId}/`, {completed: !t.completed}, console.log, console.error);
      return {...t, completed : !t.completed}
    }))
  }

  function removeTask(task){
    fetchData('DELETE', `http://127.0.0.1:8000/tasks/${task.id}/`, null, console.log, console.error);
    setTask(tasks.filter((t) => t.id != task.id))
  }

  function submitEditTask(task){
    setTask(tasks.map((t) => {
      if (t.id != task.id) return {...t}

      fetchData('PUT', `http://127.0.0.1:8000/tasks/${task.id}/`, {title: task.title}, console.log, console.error);
      return {...t, title : task.title}
    }))
    setEditTask(null);
  }

  return (
    <>
        <main>
          <article>
            <Header/>
            <ControlPanel queryHandler={(text) => setSearchQuery(text)} filterHandler={(text) => setFilter(text)}/>
            <TaskList tasks={filteredAndSearchedTasks} edit={(task) => setEditTask(task)} remove={removeTask} onUpdate={putCompleteTask}/>
            <AddButton onClick={setAddingNewTask}/>
          </article>
        </main>
        {
          addingNewTask ? <PopUp title={'NEW NOTE'} submit={addNewTask} close={() => setAddingNewTask(false)}/> : null
        }
        
        {
          currentEditTask ? <PopUp title={'EDIT TASK'} task={currentEditTask} submit={submitEditTask} close={() => setEditTask(null)}/> : null
        }
    </>
  )
}

export default App
