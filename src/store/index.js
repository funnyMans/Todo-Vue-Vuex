import { createStore } from "vuex";
export default createStore({
  state: {
    user: { name: "Vladimir Putin", email: "lugansk@gmail.com", done: false },
    todos: [
      {
        taskID: 0,
        taskName: "destroy Ukraine",
        estTime: "3 days",
        disabled: false,
        onEdit: false,
        done: false,
      },
      {
        taskID: 1,
        taskName: "ocupy Doneck",
        estTime: "7 hours",
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
          method: "editSelectedTask",
        },
        {
          btnID: 1,
          name: "Done",
          cssClass: "done-btn",
          method: "getTaskDone",
        },
        {
          btnID: 2,
          name: "Delete",
          cssClass: "danger-btn",
          method: "removeSelectedTask",
        },
      ],
      controlBtns: [
        {
          btnID: 3,
          name: "Save",
          cssClass: "edit-btn",
          method: "saveAndReplaceEditedTask",
        },
        {
          btnID: 4,
          name: "Cancel",
          cssClass: "edit-btn",
          method: "cancelEditingTask",
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

    GET_TASK_DONE(state, payload) {
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
      state.todos[payload.taskID].onEdit = true;
      state.todos.forEach((item) =>
        item.taskID !== payload.taskID ? (item.disabled = true) : payload
      );
    },

    CANCEL_EDITING(state, payload) {
      state.todos[payload.taskID].onEdit = false;
      state.todos.forEach((item) =>
        item.taskID !== payload.taskID ? (item.disabled = false) : payload
      );
    },

    SAVE_REPLACE_EDITED_TASK(state, payload) {
      state.todos[payload.taskID].onEdit = false;
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
    newTaskForUser({ commit }, payload) {
      commit("ADD_TASK", payload);
    },

    editSelectedTask({ commit }, payload) {
      commit("EDIT_TASK", payload);
    },

    cancelEditingTask({ commit }, payload) {
      commit("CANCEL_EDITING", payload);
    },

    saveAndReplaceEditedTask({ commit }, payload) {
      commit("SAVE_REPLACE_EDITED_TASK", payload);
    },

    removeSelectedTask({ commit }, payload) {
      commit("DELETE_TASK", payload);
    },

    getTaskDone({ commit }, payload) {
      commit("GET_TASK_DONE", payload);
    },

    undoTask({ commit }, payload) {
      commit("UNDO_TASK", payload);
    },
  },
});
