<template>
  <section class="input-wrapper">
    <input
      v-model="taskForUser"
      :disabled="ifSomeTaskIsOnEdit"
      style="height: 1.8rem"
      maxlength="20"
      @keyup.enter="createTaskForUser"
    />

    <TodoButton
      :method="createTaskForUser"
      :disabled="ifSomeTaskIsOnEdit"
      :show="true"
      name="Add task"
      cssClass="add-todo-btn"
    ></TodoButton>
  </section>
</template>

<script>
import TodoButton from "./TodoButton.vue";

export default {
  components: {
    TodoButton,
  },

  data() {
    return {
      todos: [],
      taskForUser: "",
      id: 2,
    };
  },

  computed: {
    ifSomeTaskIsOnEdit() {
      return this.todos.some((task) => task.onEdit);
    },
  },

  mounted() {
    this.todos = this.$store.getters.getTodoList;
  },

  methods: {
    createTaskForUser() {
      if (this.taskForUser) {
        this.$store.dispatch("addNewTask", {
          taskID: this.id++,
          taskName: this.taskForUser,
          disabled: false,
          onEdit: false,
          done: false,
        });
        this.taskForUser = "";
      }
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  margin-top: 1.3rem;
}
</style>
