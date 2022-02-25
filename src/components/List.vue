<template>
  <ul class="todos-list">
    <li v-for="todo in state.todos" :key="todo.taskID">
      <section class="single-item">
        <span :class="{ done: todo.done }"
          >{{ todo.taskName }}... Estimated time is: {{ todo.estTime }}
        </span>
        <input
          v-if="todo.onEdit"
          v-model="todo.editedName"
          type="text"
          maxlength="30"
        />
        <div class="item-buttons">
          <div v-for="button in state.taskButtons" :key="button.btnID">
            <TodoButton
              :key="button.btnID"
              :cssClass="button.cssClass"
              :name="button.name"
              :disabled="todo.disabled"
              :method="() => this[button.method](todo, todoIndex)"
            ></TodoButton>
          </div>
        </div>
      </section>
    </li>
  </ul>
</template>

<script>
import TodoButton from "./TodoButton.vue";
export default {
  components: {
    TodoButton,
  },
  emits: ["ifTaskEditing"],
  data() {
    return {
      state: this.$store.state,
      showEditInput: false,
      taskButtons: [],
    };
  },

  methods: {
    removeSelectedTask(todo) {
      this.$store.dispatch("removeSelectedTask");
    },

    getTaskDone(todo, index) {
      this.$store.dispatch("getTaskDone", todo);
    },

    undoTask(todo, index) {
      this.$store.dispatch("undoTask", todo);
    },

    editSelectedTask(todo, index) {
      this.$store.dispatch("editSelectedTask", todo);
    },

    saveAndReplaceEditedTask(todo) {
      let editedTask = {
        taskName: todo.editedName,
        editedName: todo.editedName,
        estTime: todo.estTime,
        done: todo.done,
      };
      this.$store.dispatch("saveAndReplaceEditedTask", editedTask);
    },

    cancelEditingTask(todo) {
      todo.taskName !== todo.editedName && this.saveAndReplaceEditedTask(todo);

      this.showEditInput = false;
      todo.editedName = todo.taskName;
    },
  },
};
</script>

<style scoped>
.todos-list {
  min-width: 20rem;
  max-width: 80%;
  min-height: 30rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.7rem;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  padding: 0;
  font-size: 2rem;
  font-weight: 550;
  list-style: none;
}
.single-item {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 5px;
  color: rgb(34, 24, 167);
  background-color: rgb(157, 223, 201);
}
.item-buttons {
  display: flex;
  justify-content: space-between;
}
.done {
  color: rgb(7, 104, 7);
  font-size: 2.2rem;
}
.danger {
  background-color: red;
}
</style>
