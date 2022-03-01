<template>
  <main class="main-list" v-if="user">
    <h1 class="user-name">{{ user.name }}'s</h1>
    <p class="weekly-todos-text">Todos for this week:</p>
    <List />
    <p class="add-task-title">Add a new task for {{ user.name }} :</p>
    <AddTodo />
  </main>
</template>

<script>
import List from "./components/List.vue";
import AddTodo from "./components/AddTodo.vue";

export default {
  components: {
    List,
    AddTodo,
  },

  data() {
    return {
      user: null,
    };
  },

  mounted() {
    this.user = this.$store.getters.getUser;
  },
};
</script>

<style scoped>
@import "./assets/base.css";
.main-list {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  padding: 2rem;
  background-color: rgb(142, 230, 230);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
.add-task-title {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 1.5rem;
  color: rgba(7, 7, 150, 0.582);
}
.user-name {
  font-family: "Times New Roman", Times, serif;
  font-size: 4rem;
  font-weight: 800;
  color: rgb(15, 78, 15);
}
.weekly-todos-text {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: rgb(63, 65, 43);
}
</style>
