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
  <div>
    <h1>Login</h1>
    
    <form @submit.prevent="handleSendSignInLink">
      <div>
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          :disabled="isLoading"
        />
      </div>
      
      <button type="submit" :disabled="isLoading">
        <span v-if="isLoading">Sending...</span>
        <span v-else>Send Sign-In Link</span>
      </button>
    </form>
    
    <div v-if="message">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>
/* No custom styles */
</style>
