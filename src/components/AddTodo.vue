<template>
    <form @submit.prevent="submitForm" class="add-todo-form">
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
        
        <button type="submit" class="submit-button">Add todo</button>
    </form>
</template>
    
    
<script>
    import axios from '@/axios';
    
    export default {
        data() {
            return {
                title: '',
                description: '',
                due_date: '',
                status: '',
                priority: '',
                errors: {}
            };
        },
        methods: {
            validateInput() {
                const errors = {};
                if (!this.title) errors.title = 'title is required';
                if (!this.due_date) errors.due_date = 'Due date is required';
                if (!this.status) errors.status = 'Status is required';
                if (!this.priority) errors.priority = 'Priority is required';
                return errors;
            },
            async submitForm() {
                const errors = this.validateInput();
                if (Object.keys(errors).length > 0) {
                    this.errors = errors;
                    return;
                }
                
                try {
                    await axios.post('/todos', {
                        title: this.title,
                        description: this.description,
                        due_date: this.due_date,
                        status: this.status,
                        priority: this.priority
                    });
                    this.$router.push('/');
                } catch (error) {
                    console.error("An error occurred while adding the todo:", error);
                }
            }
        }
    };
</script>
    
<style scoped>
    .error {
    color: red;
    }
    .add-todo-form {
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
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    }
    
    .submit-button:hover {
    background-color: #45a049;
    }
    </style>