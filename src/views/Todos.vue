<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { checkAuthentication } from '../firebase/auth'
import { createTodo, fetchAllTodos, deleteTodo, updateTodo } from '../firebase/todos'
import Nav from '../components/Nav.vue'

const router = useRouter()
const user = ref<any>(null)
const isAuthenticated = ref(false)
const isLoading = ref(true)
const todos = ref<Record<string, any>>({})
const newTodoText = ref('')
const isAddingTodo = ref(false)
const editingTodoId = ref<string | null>(null)
const editingTodoText = ref('')

onMounted(async () => {
  try {
    const authResult = await checkAuthentication()
    isAuthenticated.value = authResult.isAuthenticated
    user.value = authResult.user || null
    
    if (isAuthenticated.value && user.value) {
      await loadTodos()
    }
  } catch (error) {
    console.error('Auth check error:', error)
  } finally {
    isLoading.value = false
  }
})

const loadTodos = async () => {
  try {
    const userTodos = await fetchAllTodos(user.value.uid)
    todos.value = userTodos
  } catch (error) {
    console.error('Error loading todos:', error)
  }
}

const addTodo = async () => {
  if (!newTodoText.value.trim() || !user.value) return
  
  isAddingTodo.value = true
  try {
    await createTodo({
      text: newTodoText.value.trim(),
      completed: false,
      owner: user.value.uid
    })
    newTodoText.value = ''
    await loadTodos()
  } catch (error) {
    console.error('Error adding todo:', error)
  } finally {
    isAddingTodo.value = false
  }
}

const removeTodoHandler = async (todoId: string) => {
  try {
    await deleteTodo(todoId)
    await loadTodos()
  } catch (error) {
    console.error('Error deleting todo:', error)
  }
}

const updateTodoHandler = async () => {
  if (!editingTodoId.value) return
  try {
    await updateTodo(editingTodoId.value, { text: editingTodoText.value })
    editingTodoId.value = null
    editingTodoText.value = ''
    await loadTodos()
  } catch (error) {
    console.error('Error updating todo:', error)
  }
}

const editTodoHandler = (todoId: string) => {
  editingTodoId.value = todoId
  editingTodoText.value = todos.value[todoId].text
}

const goToHome = () => {
  router.push('/')
}

const todoList = computed(() => Object.entries(todos.value).map(([id, todo]) => ({ id, ...todo })))
</script>

<template>
  <div>
    <h1>Todo App</h1>
    <Nav class="nav" />
    
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    
    <div v-else-if="!isAuthenticated || !user">
      <p>Please log in to access todos.</p>
      <button @click="goToHome">Go Home</button>
    </div>
    
    <div v-else>
      <div>
        <h2>Add New Todo</h2>
        <form @submit.prevent="addTodo">
          <input
            v-model="newTodoText"
            type="text"
            placeholder="Enter todo text"
            required
            :disabled="isAddingTodo"
          />
          <button type="submit" :disabled="isAddingTodo || !newTodoText.trim()">
            {{ isAddingTodo ? 'Adding...' : 'Add Todo' }}
          </button>
        </form>
      </div>
      
      <div>
        <h2>Your Todos</h2>
        <div v-if="todoList.length === 0">
          <p>No todos yet. Add one above!</p>
        </div>
        <div v-else>
          <div v-for="todo in todoList" :key="todo.id" class="todoItem">
            <template v-if="editingTodoId === todo.id">
              <input type="checkbox" v-model="todo.completed" />
              <input type="text" v-model="editingTodoText" class="todoItem-text" />
              <button @click="updateTodoHandler">Save</button>
              <button @click="removeTodoHandler(todo.id)">Delete</button>
            </template>
            <template v-else>
              <input type="checkbox" v-model="todo.completed" />
              <p class="todoItem-text">{{ todo.text }}</p>
              <button @click="editTodoHandler(todo.id)">Edit</button>
              <button @click="removeTodoHandler(todo.id)">Delete</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  margin: 0;
}

.todoItem {
  display: flex;
  align-items: center;
  gap: 10px;
}

.todoItem-text {
  min-width: 200px;
}
/* No custom styles */
</style>
