import Home from "./component/Home";
import { TaskContext } from './context/index.js'
import { useReducer } from 'react'
import {taskReducer, initialState} from './context/taskReducer.js'



export default function App() {
  
  const [state , dispatch] = useReducer(taskReducer,initialState)

  return (
    <TaskContext.Provider value={{state,dispatch}}>
      <Home />
    </TaskContext.Provider>
  )
}