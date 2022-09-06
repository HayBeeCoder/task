import React from "react";
import { useSelector } from "react-redux";

import { ReactComponent as Plus} from "../assets/plus.svg";


const TaskManagerHeader = ({setShowModal,children}) => {
const tasks_count = useSelector(state => state?.tasks?.filteredTasks?.length)
  return (
    <div className="task-manager__header">
      <p className="task-manager__header-text">
        {" "}
        TASK &nbsp; <span className="task__count">{tasks_count}</span>
      </p>
      <button
        className="task-manager__header-icon"
        onClick={() => setShowModal(value => !value)}
      >
        <Plus />
      </button>
      {children}
    </div>
  );
};

export default TaskManagerHeader;
