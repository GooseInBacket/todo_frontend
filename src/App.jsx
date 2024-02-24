import { Route, BrowserRouter, Routes, useLocation} from "react-router-dom"
import UserTasks from "./pages/UsersTask/UsersTask"
import Main from './pages/Main/Main'

import ApiService from "./api/ApiService"

let api = new ApiService()
// api.addTask({id: uuid(), title: '123', completed: true}).then(() => console.log('ok'))
// api.getAllPosts().then((res) => console.log(res)).catch(console.log([]))
// api.getUserInfo().then((res) => console.log(res))

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/tasks" element={<UserTasks/>} />
      </Routes>
    </BrowserRouter>
  )
}