import { characterRoute } from './../characters/router/index';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/shared/pages/HomePage.vue';
import AboutPage from '@/shared/pages/AboutPage.vue';
import CharacterLayout from '@/characters/layout/CharacterLayout.vue';

const router = createRouter({
    history: createWebHistory( import.meta.env.BASE_URL ),
    routes: [
        //Publicas
        { path: '/', name: 'home', component: HomePage},
        { path: '/about', name: 'about', component: AboutPage},

        //Characters
        //{ path: '/characters', name: 'characters', component: CharacterLayout},
        //path: '/characters'
        characterRoute,

        //Default
        { path: '/:pathMatch(.*)*', redirect: () => ({name: 'home'})},
    ]
});

//path: '/characters'
//router.addRoute( characterRoute )

export default router;