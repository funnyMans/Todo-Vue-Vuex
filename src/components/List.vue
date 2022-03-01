<template>
  <ul class="todos-list">
    <li v-for="todo in todos" :key="todo.taskID">
      <SingleTodoTask :todo="todo" />
    </li>
  </ul>
</template>

<script>
import TodoButton from "./TodoButton.vue";
import SingleTodoTask from "./SingleTodoTask.vue";

export default {
  components: {
    SingleTodoTask,
    TodoButton,
  },

  data() {
    return {
      todos: [],
    };
  },

  methods: {
    getTodos() {
      this.todos = this.$store.getters.getTodoList;
    },
  },

  mounted() {
    this.getTodos();
  },
};
</script>

<style scoped>
.todos-list {
  min-width: 20rem;
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
</style>
