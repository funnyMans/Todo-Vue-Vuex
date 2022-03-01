<template>
  <section class="single-item">
    <article class="todo-text">
      <span :class="{ done: todo.done }"> {{ todo.taskName }}... </span>
      <input
        v-if="todo.onEdit"
        v-model="editedTaskValue"
        type="text"
        maxlength="30"
        @keyup.enter="saveEditedTask(todo)"
      />
    </article>

    <article class="item-buttons">
      <div v-for="button in taskButtons[currBtns]" :key="button.btnID">
        <TodoButton
          :name="button.name"
          :disabled="todo.disabled"
          :cssClass="button.cssClass"
          :method="() => this[button.method](todo)"
        ></TodoButton>
      </div>
    </article>
  </section>
</template>

<script>
import TodoButton from "./TodoButton.vue";

export default {
  components: {
    TodoButton,
  },

  props: {
    todo: Object,
  },

  data() {
    return {
      editedTaskValue: this.todo.taskName,
      taskButtons: null,
      currBtns: "mainBtns",
    };
  },

  created() {
    this.taskButtons = this.$store.getters.getTaskButtons;
  },

  updated() {
    this.$props.todo.onEdit
      ? (this.currBtns = "controlBtns")
      : this.$props.todo.done
      ? (this.currBtns = "undoBtns")
      : (this.currBtns = "mainBtns");
  },

  methods: {
    removeTask(todo) {
      this.$store.dispatch("removeTask", todo);
    },

    setTaskDone(todo) {
      this.$store.dispatch("setTaskDone", todo);
    },

    undoTask(todo) {
      this.$store.dispatch("undoTask", todo);
    },

    editTask(todo) {
      this.$store.dispatch("editTask", todo);
    },

    saveEditedTask(todo) {
      if (todo.taskName === this.editedTaskValue || !this.editedTaskValue) {
        this.$store.dispatch("cancelEditing", todo);
      } else {
        this.$store.dispatch("saveEditedTask", {
          taskID: todo.taskID,
          taskName: this.editedTaskValue,
          onEdit: false,
          done: todo.done,
        });
      }
    },

    cancelEditing(todo) {
      this.$store.dispatch("cancelEditing", todo);
    },
  },
};
</script>

<style scoped>
.single-item {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
  border-radius: 5px;
  color: rgb(34, 24, 167);
  background-color: rgba(255, 255, 255, 0.568);
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}
.todo-text {
  display: flex;
  flex-direction: column;
}
.todo-text > input {
  background-color: rgb(190, 235, 220);
  padding: 0.2rem;
  border-radius: 5px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.3rem;
}
.item-buttons {
  display: flex;
  justify-content: space-between;
  column-gap: 0.5rem;
}
.done {
  color: rgba(17, 116, 17, 0.836);
  font-size: 2.2rem;
  font-weight: 1000;
}
</style>
