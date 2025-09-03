<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { checkAuthentication, getCurrentUser, signOut } from '../firebase/auth.js'

const router = useRouter()
const user = ref(null)
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
</script>

<template>
  <div class="home-container">
    <div class="content">
      <h1>🎉 Welcome to Your Vue + Firebase App!</h1>
      
      <div v-if="isLoading" class="loading">
        <p>Loading...</p>
      </div>
      
      <div v-else-if="isAuthenticated && user" class="authenticated">
        <div class="user-info">
          <h2>Hello, {{ user.email }}!</h2>
          <p>You're successfully signed in using Firebase Auth.</p>
        </div>
        
        <div class="actions">
          <button @click="handleSignOut" class="signout-button">
            Sign Out
          </button>
        </div>
        
        <div class="features">
          <h3>What's Working:</h3>
          <ul>
            <li>✅ Firebase Authentication with Email Links</li>
            <li>✅ Vue 3 Composition API</li>
            <li>✅ Vue Router</li>
            <li>✅ Firebase Emulators (Development)</li>
            <li>✅ TypeScript Support</li>
          </ul>
        </div>
      </div>
      
      <div v-else class="not-authenticated">
        <h2>Get Started</h2>
        <p>Sign in to access your personalized dashboard.</p>
        <button @click="goToLogin" class="login-button">
          Sign In
        </button>
      </div>
      
      <div class="dev-info">
        <h3>Development Mode</h3>
        <p>This app is running with Firebase Emulators for local development.</p>
        <p><strong>Emulator UI:</strong> <a href="http://localhost:4000" target="_blank">http://localhost:4000</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #1a202c;
  margin-bottom: 40px;
  font-size: 2.5rem;
  font-weight: 700;
}

h2 {
  color: #2d3748;
  margin-bottom: 16px;
  font-size: 1.8rem;
}

h3 {
  color: #4a5568;
  margin-bottom: 16px;
  font-size: 1.3rem;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #718096;
}

.authenticated, .not-authenticated {
  margin-bottom: 40px;
}

.user-info {
  background: #f7fafc;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  border-left: 4px solid #48bb78;
}

.user-info p {
  color: #4a5568;
  margin: 0;
}

.actions {
  margin-bottom: 32px;
}

.signout-button, .login-button {
  background: #e53e3e;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.signout-button:hover {
  background: #c53030;
}

.login-button {
  background: #3182ce;
}

.login-button:hover {
  background: #2c5aa0;
}

.features {
  background: #f0fff4;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 32px;
  border-left: 4px solid #48bb78;
}

.features ul {
  margin: 0;
  padding-left: 20px;
}

.features li {
  color: #2f855a;
  margin-bottom: 8px;
  font-weight: 500;
}

.dev-info {
  background: #fef5e7;
  padding: 24px;
  border-radius: 12px;
  border-left: 4px solid #ed8936;
}

.dev-info h3 {
  color: #c05621;
  margin-bottom: 16px;
}

.dev-info p {
  color: #744210;
  margin: 8px 0;
}

.dev-info a {
  color: #3182ce;
  text-decoration: none;
  font-weight: 500;
}

.dev-info a:hover {
  text-decoration: underline;
}
</style>