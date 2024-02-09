<template>
    <div class="todo-list">
        <ul>
            <li class="todo-item" v-for="todo in todos" :key="todo.id">
                <span class="todo-title">{{ todo.title }}</span>
                <div class="action-links">
                    <router-link class="edit-link" :to="{ name: 'Edittodo', params: { id: todo.id } }">Edit</router-link>
                    <router-link class="details-link" :to="{ name: 'todoDetails', params: { id: todo.id } }">View Details</router-link>

                    <button class="delete-button" @click="deletetodo(todo.id)">Delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>
    
<script>
    import axios from '@/axios';
    
    export default {
        data() {
            return {
                todos: []
            };
        },
        methods: {
            async deletetodo(id) {
                try {
                    await axios.delete(`/todos/${id}`);
                    this.todos = this.todos.filter(todo => todo.id !== id);
                } catch (error) {
                    console.error("An error occurred while deleting the todo:", error);
                }
            }
        },
        async created() {
            try {
                const response = await axios.get('http://localhost:8000/api/todos');
                this.todos = response.data;
            } catch (error) {
                console.error("An error occurred while fetching the todos:", error);
            }
        }
    }
</script>
    
<style scoped>
    .todo-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    }
    
    .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin: 8px 0;
    border-bottom: 1px solid #ddd;
    }
    
    .todo-title {
    font-weight: bold;
    font-size: 1.1em;
    }
    
    .action-links {
    display: flex;
    align-items: center;
    }
    
    .edit-link, .details-link, .delete-button {
    margin: 0 8px;
    font-size: 0.9em;
    }
    
    .edit-link, .details-link {
    text-decoration: none;
    color: #337ab7;
    }
    
    .delete-button {
    padding: 5px 10px;
    background-color: #f44336;
    color: #fff;
    border: none;
    border-radius: 4px;
    }
    
    .delete-button:hover {
    background-color: #d32f2f;
    cursor: pointer;
    }
    </style>