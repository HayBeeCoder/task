import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

const TasksList = ({ setShowModal }) => {
  const tasks = useSelector((state) => state.tasks.filteredTasks);


  return (
    <div className="task__list">
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
    </div>
  );
};

export default TasksList;
