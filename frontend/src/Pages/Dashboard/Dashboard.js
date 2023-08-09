import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [taskdata, setTaskData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [task, setTask] = useState("");
  const author = JSON.parse(localStorage.getItem("userInfo")) || null;
  const navigate = useNavigate();

  useEffect(() => {
    if(author === null) {
      navigate('/login')
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
  });
  const editHandler = (e) => {
    const tag = e.target.id;
    console.log(tag);
    setIsDisabled(!isDisabled);
  };

  const clickHandler = async (id) => {
    try {
      const { data } = await axios.put(
        "http://localhost:5000/dashboard/updatetask" + id
      );
      setTaskData(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

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

  //   console.log(taskdata);

  return (
    <div className="dashboard">
      <div className="add-task_form">
        <form onSubmit={taskSubmitHandler}>
          <input
            type="text"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              setError(false);
            }}
          />
          <button type="submit" className="add-task_btn">
            +Add
          </button>
          {error && <span className="input-error">Field is empty</span>}
        </form>
      </div>
      <div className="tasks">
        {taskdata.map((task) => {
          return (
            <div className="task" key={task._id}>
              <input type="checkbox" onClick={() => clickHandler(task._id)} />
              <h2 id={task._id} type="text">
                {" "}
                {task.task}{" "}
              </h2>
              <div className="task_controls">
                <button onClick={editHandler}>edit</button>
                <button>delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
