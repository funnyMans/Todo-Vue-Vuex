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
    name: String,
    method: Function,
    cssClass: String,
    disabled: Boolean,
  },
};
</script>

<style scoped>
.add-todo-btn {
  background-color: rgb(28, 236, 97);
}
.add-todo-btn:hover {
  color: rgb(28, 236, 97);
}
.done-btn {
  background-color: #20db91;
  border-radius: 1rem;
}
.done-btn:hover {
  color: #20db91;
}
.undo-btn {
  background-color: rgb(74, 117, 211);
  color: white;
  border-radius: 1rem;
}
.undo-btn:hover {
  color: rgb(74, 117, 211);
}
.edit-btn {
  background: #1fd1cd;
}
.edit-btn:hover {
  color: #1fd1cd;
}
.danger-btn {
  background-color: rgba(197, 42, 14, 0.87);
}
.danger-btn:hover {
  color: rgba(197, 42, 14, 0.87);
}
.list-btn {
  border: none;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  padding: 0 1.5rem;
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
  background-color: rgba(255, 255, 255, 0.753);
  background-position: 0 0;
}
.list-btn:active {
  opacity: 0.5;
}
.list-btn:disabled {
  opacity: 0.5;
}
</style>
