import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState();
  const [displayDues, setDisplayDues] = useState({
    dues: true,
    completed: false,
  });

  useEffect(() => {
    if (author === null) {
      navigate("/login");
      return;
    }
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }, []);
  const completedTasksArray = taskdata.filter((taskdata) => taskdata.complete);

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
  const CompletedTasks = () => {
    setDisplayDues({ dues: false, completed: true });
  };
  const dueTasks = () => {
    setDisplayDues({ dues: true, completed: false });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-section">
        <div className="tasks-classification">
          <span
            className={!displayDues.dues ? "completedTasks" : ""}
            onClick={dueTasks}
          >
            Due Tasks ({taskdata.length - completedTasksArray.length})
          </span>
          <span
            className={!displayDues.completed ? "completedTasks" : ""}
            onClick={CompletedTasks}
          >
            Completed({completedTasksArray.length})
          </span>
        </div>
        {isLoading && (
          <div className="loading">
            <span>Loading...</span>
          </div>
        )}

        <div className="tasks">
          {displayDues.dues && (
            <div className="tc due-tasks">
              {taskdata.length - completedTasksArray.length === 0 &&
              isLoading === false ? (
                <div className="emptyTasks">
                  <span>No Active Tasks</span>
                </div>
              ) : (
                taskdata.map((task) => {
                  return (
                    !task.complete && (
                      <div
                        className={task.complete ? "task completed" : "task"}
                        key={task._id}
                      >
                        <span
                          className="task_item"
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
                          <button
                            onClick={() => deleteHandler(task._id, task.task)}
                          >
                            <MdDelete className="btn-icon" />
                          </button>
                        </div>
                      </div>
                    )
                  );
                })
              )}
            </div>
          )}

          {displayDues.completed && (
            <div className="tc due-tasks">
              {completedTasksArray.length === 0 && isLoading === false ? (
                <div className="emptyTasks">
                  <span>No Completed Tasks</span>
                </div>
              ) : (
                taskdata.map((task) => {
                  return (
                    task.complete && (
                      <div
                        className={task.complete ? "task completed" : "task"}
                        key={task._id}
                      >
                        <span
                          className="task_item"
                          onClick={() => clickHandler(task._id)}
                        >
                          {task.task}
                        </span>
                        <div className="task_controls">
                          <button
                            onClick={() => deleteHandler(task._id, task.task)}
                          >
                            <MdDelete className="btn-icon" />
                          </button>
                        </div>
                      </div>
                    )
                  );
                })
              )}
            </div>
          )}
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
              <MdAdd className="add-btn-icon"/>
            </button>
          </form>
          {error && <span className="input-error">Field is empty</span>}
        </div>
      </div>

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
    </div>
  );
};

export default Dashboard;
