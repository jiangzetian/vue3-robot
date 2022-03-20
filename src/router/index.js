// @/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
            title: '首页',
            layout: true,
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
