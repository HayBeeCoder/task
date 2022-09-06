// Body :    {
//     assigned_user:  <id value from /team api response >,
//     task_date: <date in 'YYYY-MM-DD' format from date field in task>,
//     task_time: <time from time field in task>,seconds in integer format(for ex=01:30am means 5400 seconds) ,
//     is_completed:<0 or 1 integer data type>,
// time_zone:< Currenttimezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds),
//     task_msg: <task description from task description field in task>
//    }
import { ReactComponent as Dropdown } from "../assets/dropdown.svg";
import { ReactComponent as DateIcon } from "../assets/date.svg";
import { ReactComponent as Time } from "../assets/time.svg";
import { ReactComponent as Delete } from "../assets/delete.svg";

import React from "react";
import { useState } from "react";
import { USERS } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteTaskMutation,
  usePostTasksMutation,
  usePostTasksQuery,
  useUpdateTaskMutation,
} from "../app/api";
import { removeSelectedTaskId, taskUpdated } from "../features/task/TasksSlice";

const formatHourMinute = (hour_or_minute) =>
  hour_or_minute < 10 ? "0" + hour_or_minute : hour_or_minute;
function convertSecondsToHoursMinutes(time_in_seconds) {
  const hour = Math.floor(time_in_seconds / 3600);
  const remaining_seconds = time_in_seconds % 3600;
  const minute = Math.floor(remaining_seconds / 60);

  return `${formatHourMinute(hour)}:${formatHourMinute(minute)}`;
}

const TaskManagerModal = ({ setShowModal }) => {
  // const selectedTaskId = useSelector(state =>)
  const [selectedTaskId, selectedTask] = useSelector((state) => [
    state.tasks.selectedTaskId,
    state.tasks.tasks.find((task) => task.id === state.tasks.selectedTaskId),
  ]);

  // console.log({selectedTaskId})

  const [description, setDescription] = useState(selectedTask?.task_msg || "");
  const [date, setDate] = useState(selectedTask?.task_date || null);

  // console.log({ time: convertSecondsToHoursMinutes(selectedTask.task_time) });
  const [time, setTime] = useState(
    convertSecondsToHoursMinutes(selectedTask?.task_time || null)
  );
  const [assignedUser, setAssignedUser] = useState(
    selectedTask?.assigned_user || null
  );
  const dispatch = useDispatch();
  const [save] = usePostTasksMutation();
  const [remove] = useDeleteTaskMutation();
  const [update] = useUpdateTaskMutation()

  const handleDelete = async () => {
    try {
      const res = await remove(selectedTaskId);
      console.log({ response_on_delete: res });
    } catch (e) {
      console.log(e);
    }
    dispatch(removeSelectedTaskId())
    setShowModal(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    if (name == "description") setDescription(value);
    if (name == "date") setDate(value);
    if (name == "time") setTime(value);

    if (name == "user") setAssignedUser(value);
  };

  // console.log(new Date().getTimezoneOffset());
  console.log({ description, date, time, assignedUser });

  const disableSaveBtn = description == "" || !date || !time || !assignedUser;

  const handleSave = async () => {
    let time_zone = new Date().getTimezoneOffset() * 60;

    const [h, m] = time.split(":");
    let value_in_seconds = parseInt(h) * 3600 + parseInt(m) * 60;

    // if (h > 12) {
    //   console.log("hallo");
    //   value_in_seconds += 3600;
    // }
    // if(!selectedTaskId){
      const payload = {
        assigned_user: assignedUser,
        task_date: date,
        task_time: value_in_seconds,
        is_completed: 0,
        task_msg: description,
        time_zone: Math.abs(time_zone),
      }
      try{

        
        if(!selectedTaskId){
          
          const res = await save(payload).unwrap();
        // }
        
        console.log(res);
      }else{
        const res = await update({task_id: selectedTaskId, patch: payload}).unwrap
        
        console.log({res_on_update: res})
      }
      
    }catch(e){
      console.log(e)
    }
      setShowModal(false)
  };

  const handleModalClose = () => {
    if (selectedTaskId) {
      dispatch(removeSelectedTaskId());
    }
    setShowModal(false);
  };

  return (
    <div className="task-manager__modal">
      {/* description  */}
      <div>
        <label htmlFor="description" className="label">
          Task Description
        </label>

        <div className="task-input__container">
          <input
            type="text"
            className="task-input"
            name="description"
            value={description}
            onChange={(e) => handleInput(e)}
          />
          <span className="task-input__icon"></span>
        </div>

        {/* <label htmlFor="description" className="label">Task Description</label> */}
      </div>

      {/* date & time  */}
      <section className="date-time__container">
        {/* date  */}
        <div className="">
          <label htmlFor="date" className="label">
            Date
          </label>

          <div className="task-input__container">
            <span className="task-input__icon">
              <DateIcon />
            </span>
            <input
              type="date"
              className="task-input"
              name="date"
              value={date}
              onChange={(e) => handleInput(e)}
            />
          </div>
        </div>

        {/* time  */}
        <div>
          <label htmlFor="time" className="label">
            Time
          </label>

          <div className="task-input__container">
            <span className="task-input__icon">
              <Time />
            </span>
            <input
              type="time"
              className="task-input"
              name="time"
              value={time}
              onChange={(e) => handleInput(e)}
            />
          </div>
        </div>
      </section>

      {/* assign user  */}
      <div>
        <label htmlFor="user" className="label">
          Assign user
        </label>

        <div className="task-input__container">
          <select
            id="user"
            name="user"
            className="task-input task-input--select"
            onChange={(e) => handleInput(e)}
            value={assignedUser}
          >
            <option value="">Assign User</option>
            {USERS.map((user) => (
              <option value={user.user_id}>{user.name}</option>
            ))}
          </select>
          <div
            className="task-input-dropdown__container"
            // onClick={(e) => e.bubbles()}
          >
            <Dropdown />
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="task-btn__wrapper">
        <span className="delete-icon__wrapper" onClick={handleDelete}>
          {selectedTask && <Delete />}
        </span>

        <div className="btn__container">
          <button className="btn btn--cancel" onClick={handleModalClose}>
            Cancel
          </button>
          <button
            className="btn btn--save"
            disabled={disableSaveBtn}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default TaskManagerModal;
