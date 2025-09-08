<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { checkAuthentication, getCurrentUser, signOut } from '../firebase/auth';

const user = ref<any>(null)
const isAuthenticated = ref(false)

onMounted(async () => {
  const authResult = await checkAuthentication()
  isAuthenticated.value = authResult.isAuthenticated
  user.value = authResult.user || null
})

</script>

<template>
  <nav>
    <ul class="nav-list">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/todos">Todos</router-link>
      </li>
      <li v-if="!isAuthenticated || !user">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-else>
        <router-link to="/logout">Logout</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

.nav-list {
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
  padding-right: 20px;
  padding-top: 20px;
}
/* No custom styles */
</style>


