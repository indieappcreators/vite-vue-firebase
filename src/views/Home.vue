<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { checkAuthentication, getCurrentUser, signOut } from '../firebase/auth';
import Nav from '../components/Nav.vue'

const router = useRouter()
const user = ref<any>(null)
const isAuthenticated = ref(false)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const authResult = await checkAuthentication()
    isAuthenticated.value = authResult.isAuthenticated
    user.value = authResult.user || null
  } catch (error) {
    console.error('Auth check error:', error)
  } finally {
    isLoading.value = false
  }
})

const handleSignOut = async () => {
  try {
    await signOut()
    isAuthenticated.value = false
    user.value = null
    router.push('/login')
  } catch (error) {
    console.error('Sign out error:', error)
  }
}

const goToLogin = () => {
  router.push('/login')
}

const goToTodos = () => {
  router.push('/todos')
}
</script>

<template>
  <div>
    <h1>Home</h1>
    <Nav class="nav" />


    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    
    <div v-else-if="isAuthenticated && user">
      <h2>Hello, {{ user.email }}</h2>
      <p>You are signed in.</p>
      <button @click="goToTodos">View Todos</button>
    </div>
    
    <div v-else>
      <h2>Not signed in</h2>
      <p>Please sign in to continue.</p>
      <button @click="goToLogin">Sign In</button>
    </div>
  </div>
</template>

<style scoped>
/* No custom styles */
</style>