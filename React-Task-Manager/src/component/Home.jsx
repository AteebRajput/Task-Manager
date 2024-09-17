import React, { useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { TaskContext } from "../context";
import { add_task, remove_task, update_task } from "../type";

const Home = () => {
  const { state, dispatch } = useContext(TaskContext);

  const [isUpdate, setIsUpdate] = useState(false);  // Flag to track if we are updating
  const [currentTaskId, setCurrentTaskId] = useState(null); // Track the task being updated
  const [text, setText] = useState("");

  const addTask = () => {
    if (text.trim()) {
      if (isUpdate) {
        dispatch({
          type: update_task,
          payload: { id: currentTaskId, name: text },  // Update task with the new text
        });
        setIsUpdate(false);
        setCurrentTaskId(null);
      } else {
        const newTask = {
          id: Math.random(),
          name: text,
        };
        dispatch({
          type: add_task,
          payload: newTask,
        });
      }
      setText("");  // Clear input field
    }
  };

  const deleteTask = (task) => {
    dispatch({ type: remove_task, payload: task });
  };

  const editTask = (task) => {
    setIsUpdate(true);
    setText(task.name);
    setCurrentTaskId(task.id);  // Set the current task being edited
  };

  return (
    <div className="bg-gradient-to-r from-orange-400 to-orange-900 h-screen w-screen flex items-center justify-center">
      <div className=" w-[500px] h-[600px] rounded-lg bg-gray-800">
        <div className="flex flex-col items-center">
          <div>
            <h1 className="font-crimson text-gray-400 text-5xl mt-10">
              Task Manager
            </h1>
          </div>
          <div className="mt-20">
            <input
              type="text"
              id="input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here"
              className="w-[400px] text-center bg-gray-950 h-10 border text-gray-500 border-gray-500 rounded-2xl"
            />
          </div>
          <div className="mt-6 flex flex-row space-x-10 mb-8">
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-orange-600 to-orange-400 py-1 px-4 rounded-3xl text-lg font-semibold text-white"
            >
              {isUpdate ? "Update Task" : "Add Task"}
            </button>
            <button className="bg-gradient-to-r from-orange-600 to-orange-400 py-1 px-4 rounded-3xl text-lg font-semibold text-white">
              Clear
            </button>
          </div>
        </div>

        {/* Mapping through tasks */}
        {state.tasks.map((task) => (
          <div key={task.id} className="mt-2 ml-14 flex items-start flex-col">
            <div className="flex flex-row justify-between w-96 text-xl text-gray-500">
              <div>
                <label>{task.name}</label>
              </div>
              <div className="space-x-6">
                <button
                  className="hover:bg-gray-300 rounded-2xl p-1"
                  onClick={() => deleteTask(task)}
                >
                  <MdDelete />
                </button>
                <button
                  className="hover:bg-gray-300 rounded-2xl p-1"
                  onClick={() => editTask(task)}
                >
                  <MdEdit />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
