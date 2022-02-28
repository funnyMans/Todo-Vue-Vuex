<template>
  <section class="single-item">
    <span :class="{ done: todo.done }">
      {{ todo.taskName }}...
      <span v-if="!todo.done">Estimated time is: {{ todo.estTime }}</span>
    </span>

    <input
      v-if="todo.onEdit"
      v-model="editedTaskValue"
      type="text"
      maxlength="30"
      @keyup.enter="saveAndReplaceEditedTask(todo)"
    />

    <div v-if="selectBtnsList(todo)" class="item-buttons">
      <div v-for="button in taskButtons[currBtns]" :key="button.btnID">
        <TodoButton
          :cssClass="button.cssClass"
          :name="button.name"
          :disabled="todo.disabled"
          :method="() => this[button.method](todo)"
        ></TodoButton>
      </div>
    </div>
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
  methods: {
    selectBtnsList(todo) {
      todo.onEdit
        ? (this.currBtns = "controlBtns")
        : todo.done
        ? (this.currBtns = "undoBtns")
        : (this.currBtns = "mainBtns");
      return this.currBtns;
    },
    removeSelectedTask(todo) {
      this.$store.dispatch("removeSelectedTask", todo);
    },

    getTaskDone(todo) {
      this.$store.dispatch("getTaskDone", todo);
    },

    undoTask(todo) {
      this.$store.dispatch("undoTask", todo);
    },

    editSelectedTask(todo) {
      this.$store.dispatch("editSelectedTask", todo);
    },

    saveAndReplaceEditedTask(todo) {
      if (todo.taskName === this.editedTaskValue || !this.editedTaskValue) {
        this.$store.dispatch("cancelEditingTask", todo);
      } else {
        let editedTask = {
          taskID: todo.taskID,
          taskName: this.editedTaskValue,
          estTime: todo.estTime,
          onEdit: !todo.onEdit,
          done: todo.done,
        };
        this.$store.dispatch("saveAndReplaceEditedTask", editedTask);
      }
    },

    cancelEditingTask(todo) {
      this.$store.dispatch("cancelEditingTask", todo);
    },
  },
};
</script>

<style scoped>
.single-item {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 5px;
  color: rgb(34, 24, 167);
  background-color: rgb(91, 255, 201);
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}
.item-buttons {
  min-width: fit-content;
  display: flex;
  justify-content: space-between;
}
.done {
  color: rgb(7, 104, 7);
  font-size: 2.2rem;
}
</style>
