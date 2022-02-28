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

  computed: {
    ifSomeTaskIsOnEdit() {
      return this.todos.some((task) => task.onEdit);
    },
  },

  data() {
    return {
      todos: [],
      taskForUser: "",
      id: 2,
    };
  },

  created() {
    this.todos = this.$store.getters.getTodoList;
  },

  methods: {
    createTaskForUser() {
      let freshTask = {};
      if (this.taskForUser) {
        freshTask = {
          taskID: this.id++,
          taskName: this.taskForUser,
          estTime: Math.ceil(Math.random() * 10) + " days",
          disabled: false,
          onEdit: false,
          done: false,
        };
      } else {
        return;
      }
      this.taskForUser = "";
      this.$store.dispatch("newTaskForUser", freshTask);
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  margin-top: 2rem;
}
</style>
