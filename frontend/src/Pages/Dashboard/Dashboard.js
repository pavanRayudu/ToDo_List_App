import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MdAdd,
  MdClose,
  MdClosedCaption,
  MdDelete,
  MdEdit,
} from "react-icons/md";
const Dashboard = () => {
  const [taskdata, setTaskData] = useState([]);
  const [error, setError] = useState(false);
  const [task, setTask] = useState("");
  const [updateTask, setUpdateTask] = useState();
  const [updateTaskPopup, setUpdateTaskPopup] = useState(false);
  const author = JSON.parse(localStorage.getItem("userInfo")) || null;
  const navigate = useNavigate();
  const [updatingTaskId, setUpdatingTaskId] = useState("");

  useEffect(() => {
    if (author === null) {
      navigate("/login");
      return;
    }
    const config = {
      method: "GET",
      headers: {
        authorization: `Bearer ${author.token}`,
      },
    };

    fetch("http://localhost:5000/dashboard", config)
      .then((res) => res.json())
      .then((data) => {
        setTaskData(data);
      });
  }, []);

  // complete the task
  const clickHandler = async (id) => {
    try {
      const { data } = await axios.put(
        "http://localhost:5000/dashboard/updatetask/" + id
      );
      setTaskData((taskdata) =>
        taskdata.map((task) => {
          if (task._id === data._id) {
            task.complete = data.complete;
          }
          return task;
        })
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // Adding the new task
  const taskSubmitHandler = async (e) => {
    e.preventDefault();
    if (!task) {
      setError(true);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${author.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/dashboard/newtask",
        { task },
        config
      );
      setTaskData([...taskdata, data]);
      setTask("");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const updateTaskHandler = (e, id, task) => {
    e.preventDefault();
    setUpdatingTaskId(id);
    setUpdateTaskPopup(true);
    setUpdateTask(task);
  };
  //update the task in database
  const updateTaskSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(updateTask);
    try {
      const { data } = await axios.put(
        "http://localhost:5000/dashboard/updatetaskDetail/" + updatingTaskId,
        { updateTask }
      );
      setTaskData((taskdata) =>
        taskdata.map((task) => {
          if (task._id === data._id) {
            task.task = data.task;
          }
          return task;
        })
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
    setUpdateTaskPopup(!updateTaskPopup);
  };

  // Delete the Task
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:5000/dashboard/deletetask/" + id
      );
      setTaskData((taskdata) =>
        taskdata.filter((task) => task._id !== data._id)
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-section">
        
        <div className="tasks">
          {taskdata.length === 0 && (
            <div className="emptyTasks">
              <span>Tasks are Empty ,Add Tasks</span>
            </div>
          )}

          {updateTaskPopup && (
            <div className="updateTaskBox">
              <div
                className="updateTask_close"
                onClick={() => setUpdateTaskPopup(false)}
              >
                <MdClose />
              </div>
              <form className="updateTaskBox_container">
                <input
                  required
                  autoFocus
                  value={updateTask}
                  onChange={(e) => setUpdateTask(e.target.value)}
                />
                <button onClick={updateTaskSubmitHandler}>Change</button>
              </form>
            </div>
          )}
          {taskdata.map((task) => {
            return (
              <div
                className={task.complete ? "task completed" : "task"}
                key={task._id}
              >
                <span
                  className="task_item"
                  style={{
                    textDecoration: task.complete ? "line-through" : "none",
                  }}
                  onClick={() => clickHandler(task._id)}
                >
                  {task.task}
                </span>
                <div className="task_controls">
                  <button
                    disabled={task.complete}
                    onClick={(e) => {
                      updateTaskHandler(e, task._id, task.task);
                    }}
                  >
                    <MdEdit className="btn-icon" />
                  </button>
                  <button onClick={() => deleteHandler(task._id, task.task)}>
                    <MdDelete className="btn-icon" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="add-task_form">
          <form onSubmit={taskSubmitHandler}>
            <input
              autoFocus
              placeholder="e.g write notes..."
              type="text"
              onChange={(e) => {
                setTask(e.target.value);
                setError(false);
              }}
              value={task}
            />
            <button type="submit" className="add-task_btn">
              <MdAdd />
            </button>
          </form>
          {error && <span className="input-error">Field is empty</span>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
