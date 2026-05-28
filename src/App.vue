<script setup lang="ts">
import Repl from './components/Repl/Repl.vue';
</script>

<template>
  <Repl />
</template>

<style>
html {
  height: 100vh;
}

@media (prefers-color-scheme: dark) {
  html,
  input,
  textarea {
    background-color: #000000;
    color: #0066cc;
  }
}
</style>
