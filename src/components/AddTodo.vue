<template>
  <section class="input-wrapper">
    <input
      v-model="taskForUser"
      :disabled="taskIsOnEdit"
      style="height: 1.8rem"
      @keyup.enter="addTodo"
    />
    <TodoButton
      :disabled="taskForUser && taskIsOnEdit"
      :method="createTaskForUser"
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
    getState() {
      this.state = this.$store.state;
    },
  },

  props: {
    taskIsOnEdit: Boolean,
    todos: Array,
  },
  data() {
    return {
      taskForUser: "",
      id: 2,
    };
  },

  methods: {
    createTaskForUser() {
      let freshTask = {
        taskID: this.id++,
        taskName: this.taskForUser,
        editedName: this.taskForUser,
        estTime: Math.ceil(Math.random() * 10) + " days",
        done: false,
      };
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
