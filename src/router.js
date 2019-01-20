import Vue from 'vue';
import Router from 'vue-router';

// Views
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Logout from './views/Logout';
import Article from './views/Article';
import CreateArticle from './views/CreateArticle';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/logout',
            component: Logout
        },
        {
            path: '/:id/:slug',
            component: Article
        },
        {
            path: '/create',
            component: CreateArticle
        }
    ]
});

export default router;