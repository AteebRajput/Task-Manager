import { add_task,remove_task, update_task } from "../type";

const initialState = {
    tasks: [
        { id: 1, name: "Task 1", },
        { id: 2, name: "Task 2", },
        { id: 3, name: "Task 3", },

    ],
}


const taskReducer = (state , action) =>{
    switch(action.type){
        case add_task:
            return{
                ...state,
                tasks: [...state.tasks,action.payload],
            }
        case remove_task:
            return{
                ...state,
                tasks: state.tasks.filter((item) => item.id !== action.payload.id)
            }
        case update_task:
            return{
                ...state,
                tasks : state.tasks.map((item) => 
                item.id == action.payload.id ? {...item , ...action.payload } : item
                )

            }
            default:
                return state;
    }
}

export {
    initialState,
    taskReducer,
}





