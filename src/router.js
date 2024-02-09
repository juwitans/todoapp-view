import { createRouter, createWebHistory } from "vue-router";

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import TodoList from '/components/TodoList.vue';
import TodoDetails from '/components/TodoDetails.vue';
import AddTodo from '/components/AddTodo.vue';
import EditTodo from '/components/EditTodo.vue';

const routes = [
    {
        path: '/Login',
        name: 'Login',
        component: Login,
        meta: {public: true}
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register,
        meta: {public: true}
    },
    {
        path: '/',
        name: 'TodoList',
        component: TodoList,
        meta: {public: false}
    },
    {
        path: '/todo/:id',
        name: 'TodoDetails',
        component: TodoDetails,
        meta: {public: false}
    },
    {
        path: '/add-todo',
        name: 'AddTodo',
        component: AddTodo,
        meta: {public: false}
    },
    {
        path: '/edit-todo/:id',
        name: 'EditTodo',
        component: EditTodo,
        meta: {public: false}
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if(!to.meta.public && !isAuthenticated) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router;