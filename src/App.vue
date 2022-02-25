<script>
import AddTodo from "./components/AddTodo.vue";
import List from "./components/List.vue";
export default {
  components: {
    AddTodo,
    List,
  },

  data() {
    return {
      state: null,
      taskForUser: "",
    };
  },

  methods: {
    consoleMethod() {
      console.log(this.state);
    },

    createTaskForUser() {
      let freshTask = {
        taskName: this.taskForUser,
        estTime: Math.floor(Math.random() * 10) + " days",
        done: false,
      };

      this.$store.dispatch("newTaskForUser", freshTask);
    },
  },

  mounted() {
    this.state = this.$store.getters.getCurrState;
  },
};
</script>

<template>
  <button @click="consoleMethod">console state</button>

  <div v-if="state">
    <h1>{{ state.user.name }}'s</h1>

    <p>Todos for this week:</p>

    <List />
    <p style="margin-top: 3rem">add a newTask for {{ state.user.name }}</p>
    <AddTodo />
  </div>
</template>

<style scoped>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
</style>
