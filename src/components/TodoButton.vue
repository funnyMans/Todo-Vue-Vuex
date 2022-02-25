<template>
  <button
    v-text="name"
    :class="['list-btn', cssClass]"
    :disabled="disabled"
    @click="method"
  ></button>
</template>

<script>
export default {
  props: {
    method: Function,
    todos: Array,
    name: String,
    cssClass: String,
    disabled: Boolean,
  },
};
</script>

<style setup>
.add-todo-btn {
  background-color: rgb(28, 236, 97) !important;
}
.add-todo-btn:disabled {
  background-color: rgb(183, 183, 189);
}
.add-todo-btn:active {
  color: green;
}
.done-btn {
  background-color: rgb(74, 211, 74);
  color: white;
  border-radius: 1rem;
}
.not-done-btn {
  background-color: rgb(74, 117, 211);
  color: white;
  border-radius: 1rem;
}
.edit-btn {
  background-color: rgba(238, 255, 0, 0.87);
}
.danger {
  background-color: rgba(252, 47, 10, 0.87);
}
.danger:hover {
  background-color: white !important;
}
.list-btn {
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 1rem;
  font-weight: 1000;
  line-height: 16px;
  min-height: 2.5rem;
  outline: 0;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

.list-btn:hover,
.list-btn:active {
  background-color: initial;
  background-position: 0 0;
  color: #ff4742;
}

.list-btn:active {
  opacity: 0.5;
}
</style>
