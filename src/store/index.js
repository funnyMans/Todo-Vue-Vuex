import { createStore } from "vuex";
export default createStore({
  state: {
    user: { name: "Vladimir Putin", email: "lugansk@gmail.com", done: false },
    todos: [
      {
        taskID: 0,
        taskName: "destroy Ukraine",
        editedName: "destroy Ukraine",
        estTime: "3days",
        onEdit: false,
      },
      {
        taskID: 1,
        taskName: "ocupy Doneck",
        editedName: "ocupy Doneck",
        estTime: "7 hours",
        onEdit: false,
      },
    ],
    taskButtons: [
      { btnID: 0, name: "Edit", method: "editSelectedTask", disabled: false },
      { btnID: 1, name: "Done", method: "getTaskDone", disabled: false },
      { btnID: 2, name: "Undo", method: "undoTask", disabled: false },
      {
        btnID: 3,
        name: "Save",
        method: "saveAndReplaceEditedTask",
        disabled: false,
      },
      {
        btnID: 4,
        name: "Cancel",
        method: "cancelEditingTask",
        disabled: false,
      },
      {
        btnID: 5,
        name: "Delete",
        method: "removeSelectedTask",
        disabled: false,
      },
    ],
  },

  getters: {
    getCurrState(state) {
      return state;
    },
  },

  mutations: {
    ADD_TASK(state, payload) {
      state.todos.push(payload);
    },
    GET_TASK_DONE(state, task) {
      state.todos.forEach(
        (item, idx) => idx === task.taskID && (item.done = true)
      );
    },
    UNDO_TASK(state, task) {
      state.todos.forEach(
        (item, idx) => idx === task.taskID && (item.done = false)
      );
    },
    EDIT_TASK(state, task) {
      state.todos.forEach(
        (item, idx) => idx === task.taskID && (item.onEdit = true)
      );
    },
    SAVE_REPLACE_EDITED_TASK(state, task) {
      state.todos.forEach((todo, idx) => {
        if (idx === task.taskID) {
        }
      });
    },
    DELETE_TASK(state, index) {
      state = state.todos.splice(index, 1);
    },
  },

  actions: {
    newTaskForUser({ commit }, task) {
      commit("ADD_TASK", task);
    },
    editSelectedTask({ commit }, task) {
      commit("EDIT_TASK", task);
    },
    saveAndReplaceEditedTask({ commit }, task) {
      commit("SAVE_REPLACE_EDITED_TASK", task);
    },
    removeSelectedTask({ commit }, task) {
      commit("DELETE_TASK", task);
    },
    getTaskDone({ commit }, task) {
      commit("GET_TASK_DONE", task);
    },
    undoTask({ commit }, task) {
      commit("UNDO_TASK", task);
    },
  },
});
