import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskManagerHeader from "./components/TaskManagerHeader";
import TaskManagerModal from "./components/TaskManagerModal";
import TaskCard from "./features/task/TaskCard";
import { useGetTasksQuery } from "./app/api";
import { addTask, setFilteredTasks } from "./features/task/TasksSlice";
import TasksList from "./features/task/TasksList";
function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [showModal, setShowModal] = useState(false);
  const { data } = useGetTasksQuery();

  useEffect(() => {
    if (data) {
      dispatch(addTask(data?.results));
      dispatch(
        setFilteredTasks(
          data?.results.filter((task, index, array) => {
            return array.indexOf(task) == index;
          })
        )
      );
    }
  }, [data]);

  useEffect(() => {
    dispatch(
      setFilteredTasks(
        data?.results.filter((task, index, array) => {
          return array.indexOf(task) == index;
        })
      )
    );
  }, [tasks])

  return (
    <div className="App">
      <aside className="sidebar"></aside>
      <div className="main">
        <header className="header"></header>
        <main>
          <div className="task-manager__container relative">
            <TaskManagerHeader setShowModal={setShowModal}>
              {showModal && <TaskManagerModal setShowModal={setShowModal} />}
            </TaskManagerHeader>
            <TasksList setShowModal={setShowModal} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
