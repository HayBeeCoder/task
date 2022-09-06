import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  selectedTaskId: null,
  filteredTasks: []
  // tasks: [
  //   {
  //     assigned_user: "xXXffF",
  //     task_date: "2022-05-23",
  //     task_time: 3600,
  //     time_zone: 19800,
  //     task_msg: "cook the food",
  //   },
  //   {
  //     assigned_user: "xXXf1fF",
  //     task_date: "2022-05-13",
  //     task_time: 7600,
  //     time_zone: 9800,
  //     task_msg: "wash the plates",
  //   },
  // ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        // console.log(state.tasks);
        state.tasks.push(...action.payload);
        // state.sort((a, b) => a.done - b.done);
      },


      // prepare(content) {
      //   return {
      //     payload: {
      //       id: nanoid(),
      //       content,
      //       done: false,
      //     },
      //   };
      // },
    },
    setFilteredTasks(state,action){
      state.filteredTasks  = action.payload
    },
    taskCompleted(state, action) {
      const { id, done } = action.payload;

      const completed_todo = state.find((todo) => todo.id == id);
      // console.log({ completed_todo, done })
      completed_todo.done = !completed_todo.done;
      state.sort((a, b) => a.done - b.done);
      // return state
    },
    taskUpdated(state, action) {
      const { id, content } = action.payload;
      const todo_to_edit = state.find((todo) => todo.id == id);
      // console.log(todo_to_edit)
      if (todo_to_edit) {
        todo_to_edit.content = content;
      }
      // return state
    },
    taskDeleted(state, action) {
      const { id } = action.payload;
      state = state.filter((todo) => todo.id != id);
      return state;
    },
    addSelectedTaskId(state, action) {
      state.selectedTaskId = action.payload;
    },
    removeSelectedTaskId(state, action) {
      state.selectedTaskId = null;
    },
  },
});

export const {
  addTask,
  todoCompleted,
  taskUpdated,
  taskDeleted,
  addSelectedTaskId,
  removeSelectedTaskId,
  setFilteredTasks
} = tasksSlice.actions;
export default tasksSlice.reducer;
