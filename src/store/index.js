import { createStore } from "vuex";
export default createStore({
  state: {
    user: { name: "Vladimir Putin", email: "lugansk@gmail.com", done: false },
    todos: [
      {
        taskID: 0,
        taskName: "destroy Ukraine",
        disabled: false,
        onEdit: false,
        done: false,
      },
      {
        taskID: 1,
        taskName: "ocupy Doneck",
        disabled: false,
        onEdit: false,
        done: false,
      },
    ],
    taskButtons: {
      mainBtns: [
        {
          btnID: 0,
          name: "Edit",
          cssClass: "edit-btn",
          method: "editTask",
        },
        {
          btnID: 1,
          name: "Done",
          cssClass: "done-btn",
          method: "setTaskDone",
        },
        {
          btnID: 2,
          name: "Delete",
          cssClass: "danger-btn",
          method: "removeTask",
        },
      ],
      controlBtns: [
        {
          btnID: 3,
          name: "Save",
          cssClass: "edit-btn",
          method: "saveEditedTask",
        },
        {
          btnID: 4,
          name: "Cancel",
          cssClass: "edit-btn",
          method: "cancelEditing",
        },
      ],
      undoBtns: [
        {
          btnID: 5,
          name: "Undo",
          cssClass: "undo-btn",
          method: "undoTask",
        },
      ],
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },

    getTodoList(state) {
      return state.todos;
    },

    getTaskButtons(state) {
      return state.taskButtons;
    },
  },

  mutations: {
    ADD_TASK(state, payload) {
      state.todos.push(payload);
    },

    SET_TASK_DONE(state, payload) {
      state.todos.forEach(
        (item) => item.taskID === payload.taskID && (item.done = true)
      );
    },

    UNDO_TASK(state, payload) {
      state.todos.forEach(
        (item) => item.taskID === payload.taskID && (item.done = false)
      );
    },

    EDIT_TASK(state, payload) {
      state.todos.forEach((item) =>
        item.taskID !== payload.taskID
          ? (item.disabled = true)
          : (item.onEdit = true)
      );
    },

    CANCEL_EDITING(state, payload) {
      state.todos.forEach((item) =>
        item.taskID !== payload.taskID
          ? (item.disabled = false)
          : (item.onEdit = false)
      );
    },

    SAVE_EDITED_TASK(state, payload) {
      console.log(payload);
      state.todos.forEach((item, idx) => {
        item.disabled = false;

        if (item.taskID === payload.taskID) {
          state.todos[idx] = payload;
        }
      });
    },

    DELETE_TASK(state, payload) {
      state = state.todos.splice(state.todos.indexOf(payload), 1);
    },
  },

  actions: {
    addNewTask({ commit }, payload) {
      commit("ADD_TASK", payload);
    },

    editTask({ commit }, payload) {
      commit("EDIT_TASK", payload);
    },

    cancelEditing({ commit }, payload) {
      commit("CANCEL_EDITING", payload);
    },

    saveEditedTask({ commit }, payload) {
      commit("SAVE_EDITED_TASK", payload);
    },

    removeTask({ commit }, payload) {
      commit("DELETE_TASK", payload);
    },

    setTaskDone({ commit }, payload) {
      commit("SET_TASK_DONE", payload);
    },

    undoTask({ commit }, payload) {
      commit("UNDO_TASK", payload);
    },
  },
});
