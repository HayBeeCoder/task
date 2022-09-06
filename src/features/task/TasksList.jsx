import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

const TasksList = ({ setShowModal }) => {
  const tasks = useSelector((state) => state.tasks.filteredTasks);


  return (
    <>
      {tasks &&
        tasks.map((task, id) => (
          <TaskCard
            message={task.task_msg}
            date={task.task_date}
            task_id={task.id}
            setShowModal={setShowModal}
            key={id}
          />
        ))}
    </>
  );
};

export default TasksList;
