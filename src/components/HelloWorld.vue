<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <h1>{{ msg }}</h1>
  <div>
    <p>Hello World Component</p>
  </div>
</template>

<style scoped>
/* No custom styles */
</style>
