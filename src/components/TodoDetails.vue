<template>
    <div v-if="todo" class="todo-details">
        <h2 class="todo-title">{{ todo.title }}</h2>
        <p class="todo-description">{{ todo.description }}</p>
        <p class="todo-due-date">{{ todo.due_date }}</p>
        <p class="todo-status">{{ todo.status }}</p>
        <p class="todo-priority">{{ todo.priority }}</p>
    </div>
</template>
    
<script>
    import axios from '@/axios';
    
    export default {
        data() {
            return {
                todo: null
            };
        },
        async mounted() {
            const todoId = this.$route.params.id;
            try {
                const response = await axios.get(`/todos/${todoId}`);
                this.todo = response.data;
            } catch (error) {
                console.error("An error occurred while fetching the todo:", error);
            }
        }
    };
</script>
    
<style scoped>
    .todo-details {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    }
    
    .todo-title {
    margin-bottom: 20px;
    font-size: 2em;
    }
    
    .todo-description, .todo-due-date, .todo-status, .todo-priority {
    font-size: 1.2em;
    }
    </style>