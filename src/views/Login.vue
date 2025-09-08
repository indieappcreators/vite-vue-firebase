<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendSignInLink, signInWithLink } from '../firebase/auth.js'
import Nav from '../components/Nav.vue'

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
    if(import.meta.env.DEV) {
      showMessage('Check command line for the sign-in link!', 'success')
    } else {
      showMessage('Check your email for the sign-in link!', 'success')
    }
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
  <div>
    <h1>Login</h1>
    <Nav class="nav" />
    <form @submit.prevent="handleSendSignInLink">
      <div>
        <fieldset class="fieldset">
          <legend><label for="email">Email:</label></legend>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            :disabled="isLoading"
          />
        </fieldset>
      </div>

      <p>
        <button type="submit" :disabled="isLoading">
          <span v-if="isLoading">Sending...</span>
          <span v-else>Send Sign-In Link</span>
        </button>
      </p>
    </form>
    
    <div v-if="message">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>

.fieldset {
  border: 0;
  padding: 0;
}

.submit {
  text-align: right;
}
/* No custom styles */
</style>