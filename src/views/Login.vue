<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendSignInLink, signInWithLink } from '../firebase/auth.js'

const router = useRouter()
const email = ref('')
const isLoading = ref(false)
const message = ref('')
const messageType = ref('')

const handleSendSignInLink = async () => {
  if (!email.value) {
    showMessage('Please enter your email address', 'error')
    return
  }

  isLoading.value = true
  message.value = ''
  
  try {
    await sendSignInLink({ email: email.value })
    showMessage('Check your email for the sign-in link!', 'success')
    email.value = ''
  } catch (error) {
    showMessage('Failed to send sign-in link. Please try again.', 'error')
    console.error('Sign-in link error:', error)
  } finally {
    isLoading.value = false
  }
}

const showMessage = (msg: string, type: 'success' | 'error') => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
    messageType.value = ''
  }, 5000)
}

// Check if user is signing in with a link
const checkSignInLink = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const link = window.location.href
  
  if (link.includes('sign-in/confirm')) {
    try {
      const user = await signInWithLink({ link })
      if (user) {
        showMessage('Successfully signed in!', 'success')
        router.push('/')
      }
    } catch (error) {
      showMessage('Failed to sign in with link. Please try again.', 'error')
      console.error('Sign-in with link error:', error)
    }
  }
}

// Check for sign-in link on component mount
checkSignInLink()
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Welcome Back</h1>
      <p class="subtitle">Sign in to your account using the magic link</p>
      
      <form @submit.prevent="handleSendSignInLink" class="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            :disabled="isLoading"
          />
        </div>
        
        <button 
          type="submit" 
          class="signin-button"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Sending...</span>
          <span v-else>Send Sign-In Link</span>
        </button>
      </form>
      
      <div v-if="message" :class="['message', messageType]">
        {{ message }}
      </div>
      
      <div class="info">
        <p>✨ No password needed - just check your email!</p>
        <p>This is a development environment using Firebase Auth Emulator</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

h1 {
  text-align: center;
  color: #1a202c;
  margin-bottom: 8px;
  font-size: 2rem;
  font-weight: 700;
}

.subtitle {
  text-align: center;
  color: #718096;
  margin-bottom: 32px;
  font-size: 1rem;
}

.login-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.875rem;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

input:disabled {
  background-color: #f7fafc;
  cursor: not-allowed;
}

.signin-button {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.signin-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.signin-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.message {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
}

.message.success {
  background-color: #f0fff4;
  color: #22543d;
  border: 1px solid #9ae6b4;
}

.message.error {
  background-color: #fed7d7;
  color: #742a2a;
  border: 1px solid #feb2b2;
}

.info {
  text-align: center;
  color: #718096;
  font-size: 0.875rem;
  line-height: 1.5;
}

.info p {
  margin: 4px 0;
}
</style>