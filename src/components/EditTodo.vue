<template>
    <form @submit.prevent="submitForm" class="edit-todo-form">
        <input class="input-field" v-model="title" placeholder="todo title" />
        <p v-if="errors.title" class="error">{{ errors.title }}</p>
        
        <input class="input-field" v-model="description" placeholder="todo Description" />
        <p v-if="errors.description" class="error">{{ errors.description }}</p>
        
        <input class="input-field" v-model="due_date" placeholder="todo due_date" />
        <p v-if="errors.due_date" class="error">{{ errors.due_date }}</p>

        <input class="input-field" v-model="status" placeholder="todo status" />
        <p v-if="errors.status" class="error">{{ errors.status }}</p>

        <input class="input-field" v-model="priority" placeholder="todo priority" />
        <p v-if="errors.priority" class="error">{{ errors.priority }}</p>
        
        <button type="submit" class="submit-button">Update todo</button>
    </form>
</template>
    
<script>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from '@/axios';
    
    export default {
        setup() {
            const todo = ref({ id: null, title: '', description: '', due_date: '', status: '', priority: '' });
            const errors = ref({});
            
            const route = useRoute();
            todo.value.id = route.params.id;
            
            const router = useRouter();
            
            const validateInput = () => {
                const errors = {};
                if (!this.title) errors.title = 'title is required';
                if (!this.due_date) errors.due_date = 'Due date is required';
                if (!this.status) errors.status = 'Status is required';
                if (!this.priority) errors.priority = 'Priority is required';
                return errors;
            };
            
            const submitForm = async () => {
                const errorMessages = validateInput();
                if (Object.keys(errorMessages).length > 0) {
                    errors.value = errorMessages;
                    return;
                }
                
                try {
                    await axios.put(`/todos/${todo.value.id}`, todo.value);
                    router.push('/');
                } catch (error) {
                    console.error("An error occurred while updating the todo:", error);
                    if (error.response && error.response.status === 422) {
                        errors.value = error.response.data.errors;
                    }
                }
            };
            
            onMounted(async () => {
                try {
                    const response = await axios.get(`/todos/${todo.value.id}`);
                    todo.value.title = response.data.title;
                    todo.value.description = response.data.description;
                    todo.value.due_date = response.data.due_date;
                    todo.value.status = response.data.status;
                    todo.value.priority = response.data.priority;
                } catch (error) {
                    console.error("An error occurred while fetching the todo:", error);
                }
            });
            return { todo, submitForm, errors };
        }
    };
</script>
    
<style scoped>
    .error {
    color: red;
    }
    .edit-todo {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    }
    
    .input-field {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    font-size: 1em;
    }
    
    .submit-button {
    padding: 10px 20px;
    background-color: #FF9800;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    }
    
    .submit-button:hover {
    background-color: #e68a00;
    }
    </style>